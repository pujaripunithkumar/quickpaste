from datetime import datetime, timezone, timedelta
import secrets
import string

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy import select

from app.database import engine
from app.models import Paste


app = FastAPI(
    title="QuickPaste API",
    version="1.0.0"
)


# -------------------------
# CORS
# -------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------
# Request schemas
# -------------------------

class PasteCreate(BaseModel):

    content: str = Field(
        ...,
        min_length=1,
        max_length=100000
    )

    language: str = Field(
        default="text",
        max_length=50
    )

    expires_in: int | None = Field(
        default=None,
        description="Expiration time in seconds"
    )


# -------------------------
# Short ID generator
# -------------------------

def generate_short_id():

    characters = (
        string.ascii_uppercase
        + string.digits
    )

    return "".join(
        secrets.choice(characters)
        for _ in range(6)
    )


# -------------------------
# Root
# -------------------------

@app.get("/")
def root():

    return {
        "message": "QuickPaste API is running"
    }


# -------------------------
# Database test
# -------------------------

@app.get("/db-test")
def db_test():

    with engine.connect():

        return {
            "message": "Database connected successfully"
        }


# -------------------------
# Create paste
# -------------------------

@app.post("/pastes")
def create_paste(paste: PasteCreate):

    expires_at = None

    if paste.expires_in is not None:

        if paste.expires_in <= 0:

            raise HTTPException(
                status_code=400,
                detail="expires_in must be greater than 0"
            )

        expires_at = (
            datetime.now(timezone.utc)
            .replace(tzinfo=None)
            + timedelta(
                seconds=paste.expires_in
            )
        )


    # Generate unique short ID

    while True:

        short_id = generate_short_id()

        with engine.connect() as connection:

            existing = connection.execute(
                select(Paste.id).where(
                    Paste.short_id == short_id
                )
            ).first()

        if existing is None:
            break


    # Create paste

    new_paste = Paste(
        short_id=short_id,
        content=paste.content,
        language=paste.language,
        expires_at=expires_at
    )


    # Save paste

    with engine.begin() as connection:

        result = connection.execute(
            Paste.__table__
            .insert()
            .values(
                short_id=new_paste.short_id,
                content=new_paste.content,
                language=new_paste.language,
                expires_at=new_paste.expires_at
            )
            .returning(
                Paste.__table__.c.short_id
            )
        )

        short_id = result.scalar_one()


    return {
        "message": "Paste created successfully",
        "id": short_id
    }


# -------------------------
# Get paste
# -------------------------

@app.get("/pastes/{paste_id}")
def get_paste(paste_id: str):

    with engine.connect() as connection:

        result = connection.execute(
            select(
                Paste.short_id,
                Paste.content,
                Paste.language,
                Paste.expires_at,
                Paste.created_at
            ).where(
                Paste.short_id == paste_id
            )
        )

        row = result.mappings().first()


    if row is None:

        raise HTTPException(
            status_code=404,
            detail="Paste not found"
        )


    # Check expiration

    if row["expires_at"] is not None:

        now = (
            datetime.now(timezone.utc)
            .replace(tzinfo=None)
        )

        if now >= row["expires_at"]:

            raise HTTPException(
                status_code=410,
                detail="Paste has expired"
            )


    return {
        "id": row["short_id"],
        "content": row["content"],
        "language": row["language"],
        "expires_at": row["expires_at"],
        "created_at": row["created_at"]
    }


# -------------------------
# Delete paste
# -------------------------

@app.delete("/pastes/{paste_id}")
def delete_paste(paste_id: str):

    with engine.begin() as connection:

        result = connection.execute(
            Paste.__table__
            .delete()
            .where(
                Paste.short_id == paste_id
            )
            .returning(
                Paste.__table__.c.short_id
            )
        )

        deleted_id = result.scalar_one_or_none()


    if deleted_id is None:

        raise HTTPException(
            status_code=404,
            detail="Paste not found"
        )


    return {
        "message": "Paste deleted successfully",
        "id": deleted_id
    }