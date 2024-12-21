from pydantic import BaseModel
from typing import Optional

class CryptoMetrics(BaseModel):
    market_cap: float
    market_part: float
    fund_cap: float
    guardian_coin: float
    goal_cap: float
    goal_sup: float
    def_sup: float

class Cryptocurrency(BaseModel):
    name_coin: str
    ticket_coin: str
    logo_url: str
    price_coin: float
    market_sup: float
    fund_sup: float
    down_coef: float
    up_coef: float
    
    def calculate_market_cap(self) -> float:
        return self.price_coin * self.market_sup
    
    def calculate_market_part(self, market_total: float) -> float:
        return (self.calculate_market_cap() / market_total) * 100
    
    # Add other calculation methods similar to the original JS version