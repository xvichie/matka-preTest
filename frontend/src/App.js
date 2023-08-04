import './App.css';
import { useState } from 'react';
import Header from './components/Header/Header';

import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4153af'
    },
    secondary: {
      main: '#ee6c4d'
    },
    error: {
      main: '#ba000d'
    },
    success: {
      main: '#4caf50'
    },
    differentSecondary: {
      main: '#F54C22'
    }
  }
});

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Container>
          <Outlet></Outlet>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
