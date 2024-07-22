import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsThunk } from '../redux/productSlice'; // Import the thunk action

const Search = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const products = useSelector((state) => state.products.items);

  const handleSearch = () => {
    dispatch(fetchProductsThunk(query)); // Dispatch the thunk with query
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
    </div>
  );
};

export default Search;
