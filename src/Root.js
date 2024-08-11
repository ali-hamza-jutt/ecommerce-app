import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
import ProductDescription from './pages/ProductDescription';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AddToCart from './pages/AddToCart';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Order from './pages/Order';
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
        <Route path="/cart" element={<Cart />} />
        <Route path="/add-to-cart/:productId" element={<AddToCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Order />} />
      </Routes>
    </Router>
  );
};

export default Root;
