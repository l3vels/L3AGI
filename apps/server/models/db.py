from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session

from config import Config

engine = create_engine(Config.DB_URI, echo=Config.ENV == "local")
Base = declarative_base()


def create_session():
    return Session(bind=engine)
