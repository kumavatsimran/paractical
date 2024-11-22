import React from 'react';
import Navbar from './component/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResepiFrom from './component/ResepiFrom';
import Home from './component/Home';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<ResepiFrom/>}>
        <Route path='/Home' element={<Home/>}></Route>

      </Route>
    </Routes>
    </BrowserRouter>
     
    </>
  );
}

export default App;
