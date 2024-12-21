from datetime import datetime
from typing import Dict
from src.utils.auth import get_password_hash, verify_password, create_access_token
from src.models.user import UserInDB

class AuthService:
    def __init__(self):
        self.users = {}  # In-memory storage for development

    async def register(self, email: str, password: str) -> Dict:
        if email in self.users:
            raise ValueError("User already exists")

        user = UserInDB(
            user_id=f"user_{int(datetime.now().timestamp())}",
            email=email,
            hashed_password=get_password_hash(password)
        )
        
        self.users[email] = user
        return {"user_id": user.user_id}

    async def login(self, email: str, password: str) -> Dict:
        user = self.users.get(email)
        if not user or not verify_password(password, user.hashed_password):
            raise ValueError("Invalid credentials")

        token = create_access_token({"user_id": user.user_id})
        return {"token": token}