from typing import Optional, Dict
from src.models.user import User

class DatabaseService:
    def __init__(self):
        self.users = {}  # In-memory storage for development

    async def create_user(self, user_id: str, email: str, data: Dict) -> User:
        if user_id in self.users:
            raise ValueError("User already exists")
        
        user = User(user_id=user_id, email=email, **data)
        self.users[user_id] = user
        return user

    async def get_user(self, user_id: str) -> Optional[User]:
        return self.users.get(user_id)