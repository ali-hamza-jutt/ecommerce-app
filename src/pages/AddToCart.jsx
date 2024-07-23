import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateCartItem } from '../redux/cartSlice';

const AddToCart = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === parseInt(productId))
  );
  const user = useSelector((state) => state.user.userData);

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(product ? product.colour : '');

  useEffect(() => {
    if (location.state) {
      const { productQuantity, productColor } = location.state;
      setQuantity(productQuantity);
      setColor(productColor);
    }
  }, [location.state]);

  if (!product) {
    return <p>Product not found.</p>;
  }

  const handleAddToCart = () => {
    const cartItem = {
      userId: user.uid,
      productId: product.id,
      productPic: product.imageUrl,
      productName: product.name,
      productPrice: product.price.current.value,
      productColor: color,
      productQuantity: quantity,
    };

    if (location.state) {
      dispatch(updateCartItem(cartItem));
    } else {
      dispatch(addToCart(cartItem));
    }

    navigate('/cart');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add {product.name} to Cart</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <img
            className="w-full h-auto object-cover rounded-lg border border-gray-300"
            src={`https://${product.imageUrl}`}
            alt={product.name}
          />
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-lg text-gray-700 mb-2">Price: {product.price.current.text}</p>
          <label className="block mb-2">
            Quantity:
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="ml-2 p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-2">
            Color:
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="ml-2 p-2 border border-gray-300 rounded"
            >
              <option value={product.colour}>{product.colour}</option>
              {/* Add more color options if available */}
            </select>
          </label>
          <button
            onClick={handleAddToCart}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            {location.state ? 'Update Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
