import { createContext , useContext } from "react"; 

export const ToDoContext = createContext({
    //Context contains all the properties and functionalities
    todos : [
        { // we will need these to access and modify later
            id : 1,
            message : "Add To Do",
            completed : false
        }
     ],

    //only write function expression , function definitions are to be in App.jsx
    addToDo : (todo)=>{},
    updateToDo : (id , todo)=>{},
    deleteToDo : (id)=>{},
    toggleComplete : (id)=>{},
})


//custom hook to transfer
export const useToDo = () =>{
    return useContext(ToDoContext)
}

export const ToDoProvider = ToDoContext.Provider



