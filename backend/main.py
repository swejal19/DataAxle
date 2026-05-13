from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import joblib
import pandas as pd
import os

import models, schemas, crud
from database import engine, get_db
from ml_service import MLPipeline

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DataAxle Backend API",
    description="Backend API for the Census Income Intelligence Platform",
    version="1.0.0"
)

# CORS middleware configuration
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize ML Pipeline
MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'model')
ml_pipeline = MLPipeline(model_dir=MODEL_DIR)

# --- Root Endpoint ---
@app.get("/", tags=["Root"])
def read_root():
    return {"message": "DataAxle Backend Running"}


# --- CRUD Endpoints ---
@app.get("/records", response_model=List[schemas.CensusDataResponse], tags=["Census Data"])
def read_records(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    records = crud.get_census_records(db, skip=skip, limit=limit)
    return records

@app.get("/records/{record_id}", response_model=schemas.CensusDataResponse, tags=["Census Data"])
def read_record(record_id: int, db: Session = Depends(get_db)):
    db_record = crud.get_census_record(db, record_id=record_id)
    if db_record is None:
        raise HTTPException(status_code=404, detail="Record not found")
    return db_record

@app.post("/records", response_model=schemas.CensusDataResponse, status_code=status.HTTP_201_CREATED, tags=["Census Data"])
def create_record(record: schemas.CensusDataCreate, db: Session = Depends(get_db)):
    return crud.create_census_record(db=db, record=record)

@app.put("/records/{record_id}", response_model=schemas.CensusDataResponse, tags=["Census Data"])
def update_record(record_id: int, updates: schemas.CensusDataUpdate, db: Session = Depends(get_db)):
    db_record = crud.update_census_record(db, record_id=record_id, updates=updates)
    if db_record is None:
        raise HTTPException(status_code=404, detail="Record not found")
    return db_record

@app.delete("/records/{record_id}", response_model=schemas.CensusDataResponse, tags=["Census Data"])
def delete_record(record_id: int, db: Session = Depends(get_db)):
    db_record = crud.delete_census_record(db, record_id=record_id)
    if db_record is None:
        raise HTTPException(status_code=404, detail="Record not found")
    return db_record


# --- Metrics Endpoint ---
@app.get("/metrics", tags=["Analytics"])
def get_metrics(db: Session = Depends(get_db)):
    return crud.get_metrics(db)


# --- Prediction Endpoint ---
@app.post("/predict", response_model=schemas.PredictionResponse, tags=["Machine Learning"])
def predict_income(request: schemas.PredictionRequest):
    try:
        result = ml_pipeline.predict(request.model_dump())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
