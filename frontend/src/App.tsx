import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [todos, setTodos] = useState<{ id: number, title: string, completed: boolean }[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const url = "http://127.0.0.1:8000";

  useEffect(() => {
    fetch(`${url}/todos`)
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = () => {
    fetch(`${url}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTodo }),
    })
    .then(response => response.json())
    .then(todo => setTodos([...todos, todo]));

    setNewTodo("");
  };

  const toggleComplete = (id: number, completed: boolean) => {
    fetch(`${url}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    })
    .then(response => response.json())
    .then(updatedTodo => {
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    });
  };

  const deleteTodo = (id: number) => {
    fetch(`${url}/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer" }}
              onClick={() => toggleComplete(todo.id, todo.completed)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
}

export default App;