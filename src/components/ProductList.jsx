import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsThunk, clearProducts } from '../redux/productSlice';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

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
        <>
        <Navbar/>
        <div className="p-4 sm:px-6 lg:px-8 " style={{ backgroundColor: '#feeeca',minHeight:'50vh' }}>
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                {content}
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default ProductList;
 