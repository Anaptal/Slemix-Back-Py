from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from src.services.auth.auth_service import AuthService
from src.models.user import UserCreate
from src.utils.auth import create_access_token

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

auth_service = AuthService()

@app.post("/auth/register")
async def register(user: UserCreate):
    try:
        result = await auth_service.register(user.email, user.password)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/auth/login")
async def login(user: UserCreate):
    try:
        result = await auth_service.login(user.email, user.password)
        return result
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))