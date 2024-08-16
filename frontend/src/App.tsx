import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [todos, setTodos] = useState<{ id: number, title: string}[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const url = "http://127.0.0.1:8000";

  useEffect(() => {
    fetch(url + "/todos")
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = () => {
    fetch(url + "/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTodo }),
    })
    .then(response => response.json())
    .then(todo => setTodos([...todos, todo]));

    setNewTodo("");
  }
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
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