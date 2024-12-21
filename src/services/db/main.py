from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from src.services.db.db_service import DatabaseService
from src.utils.auth import get_current_user

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_service = DatabaseService()

@app.get("/users/me")
async def get_current_user_data(current_user = Depends(get_current_user)):
    try:
        user = await db_service.get_user(current_user.user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))