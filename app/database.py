from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

"""
create_engine: This function creates a new SQLAlchemy engine instance.
sessionmaker: This function creates a new session factory.
declarative_base: This function creates a base class for declarative class definitions
"""

DATABASE_URL = "sqlite:///./app.db"

engine= create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
"""
engine- its the code sqlalchemy object that manages the connection to the database.
connect_args={"check_same_thread": False}:sqlite allows only one thread to access the database but the fast api allows multiple threads which will cause the app to break
"""

Sessionlocal=sessionmaker(autocommit=False, autoflush=False, bind=engine)
"""
session is a temorary connection to the database that allows us to interact with it
sessionlocal- this is a session factory that will create database sessions
autocommit=False: this means that changes to the database will not be automatically committed safe to prevent accidental data overwrites
autoflush=False: this means that changes to the database will not be automatically flushed to the database
bind=engine: this binds the session to the engine created earlier
"""
Base=declarative_base()
# Base- its the base class for all the database models in sqlalchemy

def get_db():
    db=Sessionlocal()
    try:
        yield db
    finally:
        db.close()