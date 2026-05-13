from sqlalchemy.orm import Session
from sqlalchemy import func
import models, schemas

def get_census_record(db: Session, record_id: int):
    return db.query(models.CensusData).filter(models.CensusData.id == record_id).first()

def get_census_records(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.CensusData).offset(skip).limit(limit).all()

def create_census_record(db: Session, record: schemas.CensusDataCreate):
    db_record = models.CensusData(**record.model_dump())
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

def update_census_record(db: Session, record_id: int, updates: schemas.CensusDataUpdate):
    db_record = get_census_record(db, record_id)
    if db_record:
        update_data = updates.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_record, key, value)
        db.commit()
        db.refresh(db_record)
    return db_record

def delete_census_record(db: Session, record_id: int):
    db_record = get_census_record(db, record_id)
    if db_record:
        db.delete(db_record)
        db.commit()
    return db_record

# --- Metrics Helpers ---
def get_metrics(db: Session):
    total_records = db.query(func.count(models.CensusData.id)).scalar()
    
    # Null value counts (example, doing it for age and workclass)
    null_counts = {
        "age": db.query(func.count(models.CensusData.id)).filter((models.CensusData.age == None) | (models.CensusData.age == 0)).scalar(),
        "workclass": db.query(func.count(models.CensusData.id)).filter(models.CensusData.workclass == None).scalar(),
        "education": db.query(func.count(models.CensusData.id)).filter(models.CensusData.education == None).scalar(),
        "occupation": db.query(func.count(models.CensusData.id)).filter(models.CensusData.occupation == None).scalar(),
        "native_country": db.query(func.count(models.CensusData.id)).filter(models.CensusData.native_country == None).scalar()
    }
    
    # Income label distribution
    income_query = db.query(
        models.CensusData.income, 
        func.count(models.CensusData.id)
    ).group_by(models.CensusData.income).all()
    
    income_distribution = {
        (inc if inc else "Unlabeled"): count for inc, count in income_query
    }
    
    # Demographic Clusters
    clusters = db.query(
        models.CensusData.education,
        models.CensusData.occupation,
        func.count(models.CensusData.id)
    ).group_by(models.CensusData.education, models.CensusData.occupation).all()
    
    demographic_clusters = [
        {"x": edu, "y": occ, "z": count}
        for edu, occ, count in clusters if edu and occ
    ]
    
    return {
        "total_records": total_records,
        "null_value_counts": null_counts,
        "duplicate_counts": 0,
        "income_label_distribution": income_distribution,
        "demographic_clusters": demographic_clusters,
        "invalid_record_counts": 0
    }
