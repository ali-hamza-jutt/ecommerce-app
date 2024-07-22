// ProductDescription.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductDescription = () => {
  const { productId } = useParams();
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === parseInt(productId))
  );

  if (!product) {
    return <p>Product not found.</p>;
  }

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
          <a
            href={product.url}
            className="block mt-4 text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Product
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
