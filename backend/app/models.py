from sqlalchemy import Column, Integer, String
from pydantic import BaseModel
from . import database

class TodoCreate(BaseModel):
  title: str

class Todo(database.Base):
  __tablename__ = "todos"

  id = Column(Integer, primary_key=True, index=True)
  title = Column(String, index=True)
