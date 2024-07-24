import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ref, set } from '../Authentication/firebase.js';
import { db, auth } from '../Authentication/firebase.js'; // Adjust path as necessary

const AddToCart = () => {
  const { productId } = useParams();
  const location = useLocation();
  const state = location.state?.item; // Get item data from location state
  const products = useSelector((state) => state.products.items);
  const product = products.find((item) => item.id === parseInt(productId));
  const user = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(state?.quantity || 1);
  const [color, setColor] = useState(state?.color || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      setQuantity(state.quantity);
      setColor(state.color);
    }
  }, [state]);

  if (!product && !state) {
    return <p>Product not found.</p>;
  }

  const handleAddToCart = () => {
    if (user.isAuthenticated) {
      const cartItem = {
        productId,
        name: product?.name || state.name,
        price: product?.price.current.text || state.price,
        imageUrl: product?.imageUrl || state.imageUrl,
        color,
        quantity,
      };

      const cartRef = ref(db, `carts/${user.uid}/${productId}`);
      set(cartRef, cartItem)
        .then(() => {
          navigate('/cart');
        })
        .catch((error) => {
          console.error('Error adding to cart:', error);
        });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">Add to Cart</h2>
      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="quantity" className="block mb-2">Quantity</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="color" className="block mb-2">Color</label>
          <input
            id="color"
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleAddToCart}
        >
          {state ? 'Update Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
