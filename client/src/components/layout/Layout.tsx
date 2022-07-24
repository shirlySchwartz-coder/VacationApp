import React, { useState } from 'react';
import VacationsList from '../Vacations/VacationsList';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import './Layaout.css';
import Login from '../accounts/Login';
import Register from '../accounts/Register';
import Modal from './ModalForm';
import About from '../pages/About';

function Layout() {
  return (
    <div className='Layout'>
      <BrowserRouter>
        <Header />
        <div className='Main'>
          <Routes>
            <Route path='/' element={<VacationsList />} />
            <Route path='/about' element={<About/>} />
            <Route path='/users/' element={<Register />} />
            <Route path='/users/login' element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Layout;
