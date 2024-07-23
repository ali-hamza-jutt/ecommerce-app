import React from 'react';
import { useNavigate } from 'react-router-dom';
const ProductCard = ({ product }) => {
  const navigate=useNavigate();

  // const handleClick=()=>{
  //   console.log(product.id)
  //   navigate(`productDescription/${product.id}`)
  // }
  const handleClick = () => {
    console.log(product.id);
    navigate(`/productDescription/${product.id}`); // Only include product ID
  }
  
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg"       onClick={handleClick}
>
      <img className="w-full" src={`https://${product.imageUrl}`} alt={product.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">
          Price: {product.price.current.text}
        </p>
        <p className="text-gray-700 text-base">
          Color: {product.colour}
        </p>
        <p className="text-gray-700 text-base">
          Brand: {product.brandName}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Rating: 4.5</span>
      </div>
    </div>
  );
};

export default ProductCard;
