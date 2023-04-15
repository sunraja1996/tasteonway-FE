import './App.css';
import React from 'react';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import CartPage from './pages/CartPage';
import Footer from './Components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import store from './store'
import { Provider } from 'react-redux';
import Myorder from './pages/Myorder';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/dashboard' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<Myorder />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
