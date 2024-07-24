import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductDescription = () => {
  const { productId } = useParams();
  const products = useSelector((state) => state.products.items);
  const product = products.find((item) => item.id === parseInt(productId));
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Debugging
  console.log('Products:', products);
  console.log('Product ID:', productId);
  console.log('Found Product:', product);

  if (!product) {
    return <p>Product not found.</p>;
  }

  const handleAddToCart = () => {
    if (!user.isAuthenticated) {
      navigate('/login');
    } else {
      navigate(`/add-to-cart/${productId}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Image */}
        <div className="w-full md:w-1/2">
          <img
            className="w-full h-auto object-cover rounded-lg border border-gray-300"
            src={`https://${product.imageUrl}`}
            alt={product.name}
            onError={(e) => e.target.src = 'path/to/placeholder-image.jpg'} // Add a placeholder image if needed
          />
          <div className="mt-4 flex flex-wrap gap-4">
            {product.additionalImageUrls.map((url, index) => (
              <img
                key={index}
                className="w-24 h-24 object-cover rounded-lg cursor-pointer border border-gray-300"
                src={`https://${url}`}
                alt={`${product.name} ${index}`}
                onClick={() => window.open(url, '_blank')}
                onError={(e) => e.target.src = 'path/to/placeholder-image.jpg'} // Add a placeholder image if needed
              />
            ))}
          </div>
        </div>
        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-lg text-gray-700 mb-2">{product.price.current.text}</p>
          <p className="text-gray-500 mb-2">Brand: {product.brandName}</p>
          <p className="text-gray-500 mb-2">Color: {product.colour}</p>
          <p className="text-gray-500 mb-2">Product Code: {product.productCode}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
