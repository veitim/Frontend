import { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; 

function TodoList() {

    const [todo, setTodo] = useState({desc:'', date:'', priority:'High'});
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();

    const [columnDefs, setColumnDefs] = useState([
        { field: "desc", headerName: 'Description', sortable: true, filter: true, floatingFilter: true },
        { field: "date", sortable: true, filter: true, floatingFilter: true },
        { field: "priority", sortable: true, filter: true, floatingFilter: true, //filter: 'agSetColumnFilter' <----  tarttee dependencyi
        cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} }
      ]);

    const handleChange = (event) => {
        setTodo({...todo, [event.target.name] : event.target.value});
    };

    const addTodo = (event) => {
        if (todo.date !== "" && todo.description !== "" && todo.priority !== "") {
            event.preventDefault();
            setTodos([...todos, todo]);
            setTodo({desc:'', date:'', priority:'High'});
            console.log(todo, todos);
        } else {
            alert("Enter Descirption, priority and date!");
        }
    };

    const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) => 
              index != gridRef.current.getSelectedNodes()[0].id))
          }
          else {
            alert('Select a row first!');
          }
    };

    return (
        <>
          <input 
            placeholder="Description" 
            onChange={e => setTodo({...todo, desc: e.target.value })} 
            value={todo.desc} />
          <input 
            type="date"
            placeholder="Date" 
            onChange={e => setTodo({...todo, date: e.target.value })} 
            value={todo.date} />
          <select 
            placeholder="Priority" 
            onChange={e => setTodo({...todo, priority: e.target.value })} 
            value={todo.priority}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
          <button onClick={addTodo}>Add</button>
          <button onClick={deleteTodo}>Delete</button>
          <div className="ag-theme-material" style={{width: 700, height: 500}}>
            <AgGridReact 
              ref={gridRef}
              onGridReady={ params => gridRef.current = params.api }
              rowData={todos}
              columnDefs={columnDefs}
              rowSelection="single"
            />
          </div> 
        </>
      ) 
}
  
export default TodoList;