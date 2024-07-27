import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import '../styles/ProductDescription.css';

const ProductDescription = () => {
  const { productId } = useParams();
  const products = useSelector((state) => state.products.items);
  const product = products.find((item) => item.id === parseInt(productId));
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [mainImageUrl, setMainImageUrl] = useState(product?.imageUrl);

  if (!product) {
    return <p>Product not found.</p>;
  }

  const additionalImageUrls = [
    product.imageUrl,
    ...product.additionalImageUrls
  ];

  const handleAddToCart = () => {
    if (!user.isAuthenticated) {
      navigate('/login');
    } else {
      navigate(`/add-to-cart/${productId}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="w-full p-6">
          <div className="flex flex-col md:flex-row gap-6 product-description-container">
            {/* Left Side Images */}
            <div className="image-container">
              {additionalImageUrls.map((url, index) => (
                <img
                  key={index}
                  className="small-image"
                  src={`https://${url}`}
                  alt={`${product.name} ${index}`}
                  onClick={() => setMainImageUrl(url)}
                  onError={(e) => e.target.src = 'path/to/placeholder-image.jpg'} // Add a placeholder image if needed
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="w-full md:w-1/2">
              <img
                className="main-image"
                src={`https://${mainImageUrl}`}
                alt={product.name}
                onError={(e) => e.target.src = 'path/to/placeholder-image.jpg'} // Add a placeholder image if needed
              />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 product-details">
              <h2 className="text-3xl font-bold mb-4 product-name" style={{overflowY:'hidden'}}>{product.name}</h2>
              <div className="details-container flex flex-wrap text-lg mb-4">
                <p className="text-gray-700 mr-4">Price: <span className="font-semibold text-blue-500">{product.price.current.text}</span></p>
                <p className="text-gray-500 mr-4">Brand: <span className="font-semibold text-blue-500">{product.brandName}</span></p>
                <p className="text-gray-500 mr-4">Color: <span className="font-semibold text-blue-500">{product.colour}</span></p>
                <p className="text-gray-500">Product Code: <span className="font-semibold text-blue-500">{product.productCode}</span></p>
              </div>
              
              {/* Product Description Section */}
              <div className="mb-6 product-description">
                <h3 className="text-xl font-bold mb-4">Product Description</h3>
                <p className="text-gray-600">
                  Condition: New with tags: A brand-new, unused, and unworn item
                </p>
                <p className="text-gray-600">Country/Region of Manufacture: China</p>
                <p className="text-gray-600">Department: Men</p>
                <p className="text-gray-600">Material: Polyester</p>
                <p className="text-gray-600">MPN: Does not apply</p>
                <p className="text-gray-600">Size Type: Regular</p>
                <p className="text-gray-600">Theme: Classic</p>
                <p className="text-gray-600">Vintage: No</p>
                <h3 className="text-xl font-bold mb-2">Notes</h3>
                <ul className="list-disc list-inside ml-4 notes">
                  <li className="text-gray-600">Due to the light and screen difference, the item's color may be slightly different from the pictures. Please understand.</li>
                  <li className="text-gray-600">Please allow 2-3% error due to manual measurement. Please make sure you don’t mind before you bid.</li>
                  <li className="text-gray-600">Cold gentle machine wash</li>
                  <li className="text-gray-600">Do not bleach</li>
                  <li className="text-gray-600">Do not tumble dry</li>
                  <li className="text-gray-600">Drip dry</li>
                  <li className="text-gray-600">Package: 1 pcs Male Underwear</li>
                </ul>
              </div>
              
              {/* Add to Cart Button */}
              <button
                className="add-to-cart-button"
                onClick={handleAddToCart}
              >
                Add to <ShoppingCartOutlinedIcon  sx={{ fontSize: 32 }} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDescription;
