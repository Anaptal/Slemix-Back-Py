from typing import Dict
import json
import os
from dotenv import load_dotenv

load_dotenv()

# JWT settings
JWT_SECRET = "your-secret-key"
JWT_ALGORITHM = "HS256"
JWT_EXPIRES_IN_MINUTES = 60

# Service URLs
AUTH_SERVICE_URL = "http://localhost:4000"
DB_SERVICE_URL = "http://localhost:5000"

# Firebase settings
FIREBASE_SERVICE_ACCOUNT: Dict = json.loads(
    os.getenv("FIREBASE_SERVICE_ACCOUNT", "{}")
)