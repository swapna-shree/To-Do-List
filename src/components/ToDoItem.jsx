import React, { useState, useContext } from 'react'
import { useToDo } from '../contexts/ToDoContext.js';

function ToDoItem({ todo }) {

  const [isToDoEditable, setIsToDoEditable] = useState(false)
  const [toDoMsg, setToDoMsg] = useState(todo.message)
  const { updateToDo, deleteToDo, toggleComplete } = useToDo()

  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const editToDo = () => {
    const capitalizedMsg = capitalizeFirst(toDoMsg.trim());
    updateToDo(todo.id, { ...todo, message: capitalizedMsg })
    setToDoMsg(capitalizedMsg);
    setIsToDoEditable(false)
  }

  const toggleCompleted = () => {
    toggleComplete(todo.id)
  }


  return (
    <div
      className={`flex border border-[rgb(83,105,73)] rounded-lg px-3 py-2 gap-x-3 shadow-sm duration-300 
    ${todo.completed
          ? "bg-[rgb(133,150,89)] text-[rgb(23,29,34)]"
          : "bg-[rgb(72,132,113)] text-[rgb(23,29,34)]"
        }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer accent-[rgb(23,29,34)]"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg
        ${isToDoEditable ? "border-[rgb(255,242,183)] px-2" : "border-transparent"}
        ${todo.completed ? "line-through text-[rgb(83,105,73)]" : ""}`}
        value={toDoMsg}
        onChange={(e) => setToDoMsg(e.target.value)}
        readOnly={!isToDoEditable}
        onKeyDown={(e) => {
          if (isToDoEditable && e.key === 'Enter') {
            editToDo();
          }
        }}
      />

      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-[rgb(133,150,89)] justify-center
       items-center bg-[rgb(255,242,183)] hover:bg-yellow-100 text-[rgb(23,29,34)] shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;
          if (isToDoEditable) {
            editToDo();
          } else setIsToDoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isToDoEditable ? "Save" : "Edit"}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-[rgb(133,150,89)] justify-center items-center bg-[rgb(255,242,183)] hover:bg-yellow-100 text-red-600 shrink-0"
        onClick={() => {
          deleteToDo(todo.id);
        }}
      >
        ❌
      </button>
    </div>
  );
}

export default ToDoItem