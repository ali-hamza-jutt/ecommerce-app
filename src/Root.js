// src/Root.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
import ProductDescription from './pages/ProductDescription';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
// import ShoppingCart from './pages/ShoppingCart';
// import Checkout from './pages/Checkout';
// import OrderHistory from './pages/OrderHistory';
// import AdminPanel from './pages/AdminPanel';
// import UserDashboard from './pages/UserDashboard';
import ProductList from './components/ProductList';
import App from './App';
import './index.css'

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/productslist/:categoryId" element={<ProductList />} />
        <Route path="/productDescription/:productId" element={<ProductDescription />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* <Route path="/productDescription/:productId" element={<ProductDescription />} /> */}



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
