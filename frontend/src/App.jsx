import React from 'react'; 
import './App.css';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import AdminPage from './pages/AdminPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';  // React Router v6
import Nav from './pages/Nav';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

function App() {
 
  return (
    <>
    <Nav />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
