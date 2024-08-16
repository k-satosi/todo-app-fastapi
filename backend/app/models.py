from datetime import date
from typing import Optional
from sqlalchemy import Column, Integer, String, Boolean, Date
from pydantic import BaseModel
from . import database

class TodoCreate(BaseModel):
  title: str
  due_date: Optional[date] = None

class TodoUpdate(BaseModel):
  title: Optional[str] = None
  completed: Optional[bool] = None
  due_date: Optional[date] = None

class Todo(database.Base):
  __tablename__ = "todos"

  id = Column(Integer, primary_key=True, index=True)
  title = Column(String, index=True)
  completed = Column(Boolean, default=False)
  due_date = Column(Date, nullable=True)
