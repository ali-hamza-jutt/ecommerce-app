import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../redux/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalBill = cartItems.reduce((total, item) => total + (item.productPrice * item.productQuantity), 0);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleEdit = (product) => {
    navigate(`/add-to-cart/${product.productId}`, { state: product });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between mb-4 border-b border-gray-300 pb-4">
              <div className="flex items-center">
                <img
                  className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                  src={`https://${item.productPic}`}
                  alt={item.productName}
                />
                <div className="ml-4">
                  <p className="font-bold">{item.productName}</p>
                  <p>Color: {item.productColor}</p>
                  <p>Quantity: {item.productQuantity}</p>
                  <p>Price: {item.productPrice}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleEdit(item)}
                  className="mr-4 px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
              <p className="font-bold">Total: ${(item.productPrice * item.productQuantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <p className="text-xl font-bold">Total Bill: ${totalBill.toFixed(2)}</p>
            <Link
              to="/checkout"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
