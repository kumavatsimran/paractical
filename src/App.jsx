import React from 'react';
import Navbar from './component/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResepiFrom from './component/ResepiFrom';
import Home from './component/Home';
import EditPage from './component/EditPage';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<ResepiFrom/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/EdiePage/:id' element={<EditPage/>}/>

      
    </Routes>
    </BrowserRouter>
     
    </>
  );
}

export default App;
