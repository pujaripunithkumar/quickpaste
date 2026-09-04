from datetime import datetime, timezone

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
# Response helper
# -------------------------

def paste_response(paste: Paste):
    return {
        "id": str(paste.id),
        "content": paste.content,
        "language": paste.language,
        "expires_at": paste.expires_at,
        "created_at": paste.created_at
    }


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

        expires_at = datetime.now(timezone.utc).replace(
            tzinfo=None
        )

        from datetime import timedelta

        expires_at = expires_at + timedelta(
            seconds=paste.expires_in
        )

    new_paste = Paste(
        content=paste.content,
        language=paste.language,
        expires_at=expires_at
    )

    with engine.begin() as connection:

        result = connection.execute(
            Paste.__table__
            .insert()
            .values(
                content=new_paste.content,
                language=new_paste.language,
                expires_at=new_paste.expires_at
            )
            .returning(Paste.__table__.c.id)
        )

        paste_id = result.scalar_one()

    return {
        "message": "Paste created successfully",
        "id": str(paste_id)
    }


# -------------------------
# Get paste
# -------------------------

@app.get("/pastes/{paste_id}")
def get_paste(paste_id: str):

    with engine.connect() as connection:

        result = connection.execute(
            select(Paste).where(
                Paste.id == paste_id
            )
        )

        paste = result.scalar_one_or_none()

    if paste is None:
        raise HTTPException(
            status_code=404,
            detail="Paste not found"
        )

    # Check expiration

    if paste.expires_at is not None:

        now = datetime.now(timezone.utc).replace(
            tzinfo=None
        )

        if now >= paste.expires_at:
            raise HTTPException(
                status_code=410,
                detail="Paste has expired"
            )

    return paste_response(paste)


# -------------------------
# Delete paste
# -------------------------

@app.delete("/pastes/{paste_id}")
def delete_paste(paste_id: str):

    with engine.begin() as connection:

        result = connection.execute(
            Paste.__table__
            .delete()
            .where(Paste.id == paste_id)
            .returning(Paste.__table__.c.id)
        )

        deleted_id = result.scalar_one_or_none()

    if deleted_id is None:
        raise HTTPException(
            status_code=404,
            detail="Paste not found"
        )

    return {
        "message": "Paste deleted successfully",
        "id": str(deleted_id)
    }