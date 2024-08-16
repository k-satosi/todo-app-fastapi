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
      body: JSON.stringify({
        title: todos.find(todo => todo.id === id)?.title,
        completed: !completed
      }),
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Todo List</h1>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className="flex justify-between item-center bg-gray-50 p-2 rounded-lg">
              <span
                className={`text-lg ${todo.completed ? "line-through text-gray-400" : "text-gray-800"} cursor-pointer`}
                onClick={() => toggleComplete(todo.id, todo.completed)}
              >
                {todo.title}
              </span>
              <button
                className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            className="w-full p-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
          />
          <button
            className="w-full mt-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            onClick={addTodo}
          >
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;