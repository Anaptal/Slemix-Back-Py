from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class WalletCreate(BaseModel):
    blockchain: str
    address: str

class Wallet(BaseModel):
    wallet_id: str
    user_id: str
    blockchain: str
    address: str
    balance: float = 0
    last_updated: datetime = datetime.now()