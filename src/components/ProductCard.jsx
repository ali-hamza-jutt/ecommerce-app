import React from 'react';

const ProductCard = ({ product }) => {
    console.log(product)
  return (
    <div key={product.id} className="border p-5">
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover mb-4" />
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.brandName}</p>
      <p className="text-sm text-gray-500">{product.colour}</p>
      <p className="text-xl font-bold">${product.price.current.value}</p>
      <p className="text-sm text-gray-500">Rating: {product.rating}</p>
    </div>
  );
};

export default ProductCard;
