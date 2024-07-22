import React from 'react';
import Search from './components/Search';
import ProductList from './components/ProductList';

const App = () => {
  return (
    <div>
      <h1>Welcome to Our E-commerce Platform</h1>
      <Search />
      <ProductList/>
    </div>
  );
};

export default App;
