from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import models, database

app = FastAPI()

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

database.Base.metadata.create_all(bind=database.engine)

@app.get("/todos")
def get_todos(db: Session = Depends(database.get_db)):
  return db.query(models.Todo).all()

@app.post("/todos")
def create_todo(todo: models.TodoCreate, db: Session = Depends(database.get_db)):
  db_todo = models.Todo(**todo.dict())
  db.add(db_todo)
  db.commit()
  db.refresh(db_todo)
  return db_todo
