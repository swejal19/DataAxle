from pydantic import BaseModel, ConfigDict
from typing import Optional

# ---- Census Data Schemas ----

class CensusDataBase(BaseModel):
    age: Optional[int] = None
    workclass: Optional[str] = None
    education: Optional[str] = None
    marital_status: Optional[str] = None
    occupation: Optional[str] = None
    relationship: Optional[str] = None
    race: Optional[str] = None
    gender: Optional[str] = None
    hours_per_week: Optional[int] = None
    native_country: Optional[str] = None
    income: Optional[str] = None

class CensusDataCreate(CensusDataBase):
    pass

class CensusDataUpdate(CensusDataBase):
    pass

class CensusDataResponse(CensusDataBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

# ---- Prediction Schemas ----

class PredictionRequest(BaseModel):
    age: Optional[int] = None
    workclass: Optional[str] = None
    education: Optional[str] = None
    marital_status: Optional[str] = None
    occupation: Optional[str] = None
    relationship: Optional[str] = None
    race: Optional[str] = None
    gender: Optional[str] = None
    hours_per_week: Optional[int] = None
    native_country: Optional[str] = None

class PredictionResponse(BaseModel):
    prediction: str
    confidence: float
    status: str
