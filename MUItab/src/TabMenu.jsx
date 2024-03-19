import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import TodoList from './TodoList';
import Home from './Home'
import Toolbar from '@mui/material/Toolbar';

function TabMenu (props) {

    const [value, setValue] = useState(1);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    }
  
    return (
    <Box>
        <Toolbar>
          <Tabs value={ value } onChange={ handleChange }  >
            <Tab label='Home' />
            <Tab label='Todos' />
          </Tabs> 
        </Toolbar>
      { value === 0 && <Home /> }
      { value === 1 && <TodoList /> }
    </Box>
    );
  }
  
  export default TabMenu;