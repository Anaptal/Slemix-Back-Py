from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserInDB(BaseModel):
    user_id: str
    email: EmailStr
    hashed_password: str
    created_at: datetime = datetime.now()

class User(BaseModel):
    user_id: str
    email: EmailStr
    display_name: Optional[str] = None
    created_at: datetime