import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';

 function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Signup />} />
    <Route path='/login' element={<Login/>} />
    <Route path='/dashboard' element={ <ProtectedRoute> <Dashboard/> </ProtectedRoute> } />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
