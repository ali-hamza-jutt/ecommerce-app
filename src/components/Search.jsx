import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice.js';

const Search = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const products = useSelector((state) => state.products.items);

  const handleSearch = () => {
    dispatch(fetchProducts(query));
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
