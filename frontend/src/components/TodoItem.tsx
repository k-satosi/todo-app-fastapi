import React, { useState } from "react";

interface TodoItemProps {
  id: number;
  title: string;
  due_date: string | undefined;
  completed: boolean;
  onUpdate: (id: number, newTitle: string) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, due_date, completed, onUpdate, onToggleComplete, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(title);

  const handleSave = () => {
    onUpdate(id, editingTitle);
    setIsEditing(false);
  };

  const isDueSoon = (dueDate: string | undefined) => {
    if (!dueDate) return false;
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays <= 3;
  }

  return (
    <li className={`flex justify-between item-center p-2 rounded-lg ${isDueSoon(due_date) ? 'bg-yellow-100' : 'bg-gray-50'}`}>
      {isEditing ? (
        <>
          <input
            className="text-lg text-gray-800 flex-grow p-1 border-b border-gray-300 focus:outline-none"
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
          />
          <button
            className="ml-2 bg-blue-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="ml-2 bg-gray-500 text-white text-sm px-2 py-1 rounded hover:bg-gray-600"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <div>
            <span
              className={`text-lg ${completed ? "line-through text-gray-400" : "text-gray-800"} cursor-pointer`}
              onClick={() => onToggleComplete(id, completed)}
            >
              {title}
            </span>
            {due_date && (
              <div className="text-sm text-gray-600">
                Due: {new Date(due_date).toLocaleDateString()}
              </div>
            )}
          </div>
          <div>
            <button
              className="ml-2 bg-yellow-500 text-white text-sm px-2 py-1 rounded hover:bg-yellow-600"
              onClick={() => {
                setIsEditing(true);
                setEditingTitle(title);
              }}
            >
              Edit
            </button>
            <button
              className="ml-2 bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
