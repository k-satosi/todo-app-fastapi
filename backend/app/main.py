from fastapi import FastAPI, Depends, HTTPException
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

@app.put("/todos/{todo_id}")
def update_todo(todo_id: int, todo: models.TodoUpdate, db: Session = Depends(database.get_db)):
  db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
  if db_todo is None:
    raise HTTPException(status_code=404, detail="Todo not found")

  db_todo.title = todo.title if todo.title is not None else db_todo.title
  db_todo.completed = todo.completed if todo.completed is not None else db_todo.completed
  db_todo.due_date = todo.due_date if todo.due_date is not None else db_todo.due_date
  db.commit()
  db.refresh(db_todo)
  return db_todo

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(database.get_db)):
  db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
  if db_todo is None:
    raise HTTPException(status_code=404, detail="Todo not found")

  db.delete(db_todo)
  db.commit()
  return {"message": "Todo deleted"}
