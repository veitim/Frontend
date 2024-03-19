import { Container, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import './App.css'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TabMenu from './TabMenu';

function App({children}) {

  return (

    <Container maxWidth="xl">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
          </LocalizationProvider>
      <CssBaseline />
      <TabMenu />
    </Container>
  );
}

export default App
