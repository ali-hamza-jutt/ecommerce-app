import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsThunk } from '../redux/productSlice'; // Import the thunk action
import ProductCard from './ProductCard';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  console.log(products)

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProductsThunk());
    }
  }, [productStatus, dispatch]);

  let content;

  if (productStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (productStatus === 'succeeded') {
    content = products.map((product) => <ProductCard key={product.id} product={product} />);
  } else if (productStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{content}</div>;
};

export default ProductList;
