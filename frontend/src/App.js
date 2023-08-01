import './App.css';
import { useState } from 'react';
import Header from './components/Header/Header';

import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';


function App() {

  return (
    <>
      <Header></Header>
      <Container>
        <Outlet></Outlet>
      </Container>
    </>
  );
}

export default App;
