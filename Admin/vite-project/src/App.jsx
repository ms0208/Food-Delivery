import React from 'react';
import Navbar from './components/navbar/Navbar.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Add from './pages/add/Add.jsx';
import List from './pages/list/List.jsx';
import Orders from './pages/orders/Order.jsx';
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div>
      <Navbar />
      <ToastContainer/>
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add/>}/>
          <Route path='/list' element={<List/>}/>
          <Route path='/orders' element={<Orders/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App

