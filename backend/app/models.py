from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.database import Base
import uuid


class Paste(Base):
    __tablename__ = "pastes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    content = Column(Text, nullable=False)
    language = Column(String(50), default="text")
    expires_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, server_default=func.now())