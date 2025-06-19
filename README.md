![Screenshot 2025-06-19 214004](https://github.com/user-attachments/assets/db28d68b-52b8-40cc-b1d7-08bba084a539)

##Revision Notes

### Without `index.js`

```js
import { ToDoProvider } from './contexts/ToDoContext';
import { AuthProvider } from './contexts/AuthContext';
````

### With `index.js`

```js
// contexts/index.js
export * from './ToDoContext';
export * from './AuthContext';
```

Then in components:

```js
import { ToDoProvider, AuthProvider } from './contexts';
```

---

## Immutable State Updates with Callbacks

Always use the callback pattern when updating state based on previous values to preserve immutability.

### Add Todo

```js
setToDos((prev) => [todo, ...prev]);
```

### Add Todo with ID

```js
setToDos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
```

### Update Todo by ID

```js
setToDos((prev) =>
  prev.map((prevToDo) => (prevToDo.id === id ? todo : prevToDo))
);
```

### Delete Todo

```js
setToDos((prev) => prev.filter((todo) => todo.id !== id));
```

### Toggle Complete

```js
setToDos((prev) =>
  prev.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )
);
```

---

## Logic Overview

| Operation        | Description                    | Logic                            |
| ---------------- | ------------------------------ | -------------------------------- |
| `addToDo(todo)`  | Adds a new todo at the top     | `[newTodo, ...prev]`             |
| `updateToDo(id)` | Replaces todo with matching ID | `map(): if match → replace`      |
| `deleteToDo(id)` | Removes todo with matching ID  | `filter(): keep if id !== match` |
| `toggleComplete` | Toggles the `completed` field  | `map(): if match → flip boolean` |

---

## Local Storage Integration

### Save to Local Storage

```js
useEffect(() => {
  localStorage.setItem('items', JSON.stringify(items));
}, [items]);
```

### Load from Local Storage

```js
useEffect(() => {
  const storedItems = JSON.parse(localStorage.getItem('items'));
  if (storedItems) {
    setItems(storedItems);
  }
}, []);
```

---
