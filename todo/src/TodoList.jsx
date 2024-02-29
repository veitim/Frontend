import { useState } from "react";
import TodoTable from "./TodoTable";

function TodoList() {

    const [desc, setDesc] = useState({description:'', date:''});
    const [todos, setTodos] = useState([]);

    const handleChange = (event) => {
        setDesc({...desc, [event.target.name] : event.target.value});
    };

    const addTodo = (event) => {
        if (desc.date !== "" && desc.description !== "") {
            event.preventDefault();
            setTodos([...todos, desc]);
            setDesc({description:'', date:''});
            console.log(desc, todos);
        } else {
            alert("Enter Descirption and date!");
        }
    };

    const deleteTodo = (index) => {
        const updateTodo = todos.filter((todo, i) => i !== index)
        setTodos(updateTodo);
    };

    return(
    <>
    <header>
        <h3>Simple todolist</h3>
    </header>
    
    <div className="search">
        <form>
            <label>Description: </label>
            <input type="text" name="description" onChange={handleChange} value={desc.description} />
            <label>Date: </label>
            <input type="date" name="date" onChange={handleChange} value={desc.date} />
            <button onClick={addTodo}>Add</button>
        </form>
    </div>
    <TodoTable todos={todos} deleteTodo={deleteTodo}/>
    </>
    );
}
  
export default TodoList;