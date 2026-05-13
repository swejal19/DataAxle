from sqlalchemy import Column, Integer, String
from database import Base

class CensusData(Base):
    __tablename__ = "census_data"

    id = Column(Integer, primary_key=True, index=True)
    age = Column(Integer, nullable=True)
    workclass = Column(String, nullable=True)
    education = Column(String, nullable=True)
    marital_status = Column(String, nullable=True)
    occupation = Column(String, nullable=True)
    relationship = Column(String, nullable=True)
    race = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    hours_per_week = Column(Integer, nullable=True)
    native_country = Column(String, nullable=True)
    income = Column(String, nullable=True)
