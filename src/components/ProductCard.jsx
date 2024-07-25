import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';



const ProductCard = ({ product }) => {
  const navigate=useNavigate();


  const handleClick = () => {
    console.log(product.id);
    navigate(`/productDescription/${product.id}`); 
  }
  function generateRandomNumber() {
    // Generate a random number between 0.1 and 5.0 with one decimal place
    const randomNumber = Math.random() * 4.9 + 0.1;
    return randomNumber.toFixed(1);
  }
  
  
  return (
    <div className="max-w-xs w-70  bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer  mx-auto"       onClick={handleClick}
>
      <img className="w-full h-57  object-contain" src={`https://${product.imageUrl}`} alt={product.name} />
      <div className="p-4">
        <div className="text-lg font-semibold text-gray-800">{product.name}</div>

        <p className="text-red-600 text-xl font-bold my-1">
          Price: {product.price.current.text}
        </p>
        <p className="text-green-600 text-sm my-1">
          Brand: {product.brandName}
        </p>
        <p className="text-gray-700 my-1">
          Color: {product.colour}
        </p>
      <div className="my-1">
      <p className="card-rating">
            <Box
              sx={{
                '& > legend': { mt: 3 },
                '.MuiRating-iconEmpty': {
                  color: '#f2f2f2',
                },
                '.MuiRating-iconFilled': {
                  color: '##e16120',
                },
              }}
            >
              <Rating
                name="read-only"
                value={generateRandomNumber()}
                readOnly
                precision={0.1}
              />
            </Box>
          </p>
      </div>
      </div>
    </div>
  );
};

export default ProductCard;
