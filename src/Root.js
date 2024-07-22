// src/Root.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
// import ProductDetails from './pages/ProductDetails';
// import ShoppingCart from './pages/ShoppingCart';
// import Checkout from './pages/Checkout';
// import OrderHistory from './pages/OrderHistory';
// import AdminPanel from './pages/AdminPanel';
// import UserDashboard from './pages/UserDashboard';
import App from './App';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/user-dashboard" element={<UserDashboard />} /> */}
      </Routes>
    </Router>
  );
};

export default Root;
