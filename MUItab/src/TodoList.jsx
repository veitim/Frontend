import { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, TextField, MenuItem, Stack } from '@mui/material';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function TodoList() {

    const [todo, setTodo] = useState({desc:'', date:null, priority:''});
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();

    const [columnDefs, setColumnDefs] = useState([
        { field: "desc", headerName: 'Description', sortable: true, filter: true, floatingFilter: true },
        { field: "date", cellDataType: 'text', sortable: true, filter: true, floatingFilter: true },
        { field: "priority", sortable: true, filter: true, floatingFilter: true,
        cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} }
      ]);

    const handleChange = (event) => {
        setTodo({...todo, [event.target.name] : event.target.value});
    };

    const changeDate = (date) => {
      setTodo({...todo, date});
    };

    const addTodo = (event) => {
        if (todo.date !== "" && todo.description !== "" && todo.priority !== "") {
            event.preventDefault();
            setTodos([...todos, todo]);
            setTodo({desc:'', date:null, priority:''});
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

    const priorities = [
      {
        value: 'High',
        label: 'High',
      },

      {
        value: 'Medium',
        label: 'Medium',
      },
      {
        value: 'Low',
        label: 'Low',
      },
    ];

    return (
        <>
        <Stack mt={2} direction="row" spacing={2} justifyContent="center" alignItems="center">
          <TextField
            label="Description" 
            value={todo.desc}
            onChange={e => setTodo({...todo, desc: e.target.value })}/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
            label='Date' 
            value={todo.date} 
            onChange={(date) => changeDate(date)} />
          </LocalizationProvider>
          <TextField
            sx={{ m: 1, width: '22ch' }}
            label="Priority"
            select
            defaultValue="High"
            onChange={e => setTodo({...todo, priority: e.target.value })} 
            value={todo.priority}
            >
                {priorities.map((select) => (
                  <MenuItem key={select.value} value={select.value}>
                    {select.label}
                  </MenuItem>
                ))}
          </TextField>

          <Button variant="contained" onClick={addTodo}>Add</Button>
          <Button color="error" onClick={deleteTodo}>Delete</Button>
        </Stack>
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