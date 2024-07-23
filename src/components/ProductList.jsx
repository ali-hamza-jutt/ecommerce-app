import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsThunk,clearProducts } from '../redux/productSlice';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';

const ProductList = () => {
    const dispatch = useDispatch();
    const { categoryId } = useParams(); // Get categoryId from URL parameters
    const products = useSelector((state) => state.products.items);
    const productStatus = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
        dispatch(clearProducts()); // Clear previous products
    if (categoryId) {
        dispatch(fetchProductsThunk(categoryId)); // Pass categoryId to the thunk
    }
}, [categoryId, dispatch]);

let content;

if (productStatus === 'loading') {
    content = <p>Loading...</p>;
} else if (productStatus === 'succeeded') {
    content = products.map((product) => (
        <ProductCard key={product.id} product={product} />
    ));
} else if (productStatus === 'failed') {
    content = <p>{error}</p>;
}

return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {content}
    </div>
);
}

export default ProductList;
