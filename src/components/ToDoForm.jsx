import React, { useState } from 'react'
import { useToDo } from '../contexts/ToDoContext.js'

function ToDoForm() {
  const [todo, setToDo] = useState("")
  const { addToDo } = useToDo()

  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const add = (e) => {
    e.preventDefault()

    if (!todo) return;
    const capitalized = capitalizeFirst(todo.trim());
    addToDo({ message: capitalized, completed: false })
    setToDo("")
  }

  return (
    <form
      onSubmit={add}
      className='flex'>

      <input type="text"
        placeholder='Add Task '
        className='w-full border border-[rgb(133,150,89)] rounded-l-lg px-3 outline-none duration-150 bg-[rgb(21,48,47)] text-[rgb(255,242,183)] py-1.5'
        value={todo}
        onChange={(e) => setToDo(e.target.value)}
      />
      <button
        type='submit'
        className='rounded-r-lg px-4 py-1.5 bg-[rgb(72,132,113)] text-[rgb(23,29,34)] font-semibold'>
        Add
      </button>
    </form>
  )
}

export default ToDoForm;