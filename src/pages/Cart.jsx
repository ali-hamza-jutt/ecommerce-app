import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ref, onValue, remove } from 'firebase/database';
import { db } from '../Authentication/firebase.js'; // Adjust path as necessary
import { setCartItems, selectCartItems } from '../redux/cartSlice.js'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cartItems = useSelector(selectCartItems);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAuthenticated) {
      const cartRef = ref(db, `carts/${user.uid}`);
      const unsubscribe = onValue(cartRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          dispatch(setCartItems(Object.values(data)));
        } else {
          dispatch(setCartItems([])); // Clear cart if no data
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [user.isAuthenticated, dispatch, user.uid]);

  const handleEdit = (item) => {
    navigate(`/add-to-cart/${item.productId}`, {
      state: { item } // Pass the item data to the add-to-cart page
    });
  };

  const handleDelete = (productId) => {
    if (user.isAuthenticated) {
      const cartRef = ref(db, `carts/${user.uid}/${productId}`);
      remove(cartRef)
        .then(() => {
          dispatch(setCartItems(cartItems.filter(item => item.productId !== productId)));
        })
        .catch((error) => {
          console.error('Error removing item from cart:', error);
        });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user.isAuthenticated) {
    return <p>Please log in to view your cart.</p>;
  }

  const totalBill = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price) || 0; // Ensure price is a number
    const itemQuantity = parseInt(item.quantity) || 1; // Ensure quantity is an integer
    const itemTotalPrice = parseFloat(item.totalPrice) || itemPrice * itemQuantity; // Default totalPrice if not set
    return total + itemTotalPrice;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 mb-4">
            <img
              className="w-24 h-24 object-cover rounded-lg border border-gray-300"
              src={`https://${item.imageUrl}`}
              alt={item.name}
            />
            <div>
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p>Color: {item.color}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
              <p>Total Price: ${item.totalPrice}</p> {/* Display totalPrice */}
            </div>
            <div className="flex gap-2 ml-auto">
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => handleDelete(item.productId)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
      <div className="mt-6">
        <h3 className="text-xl font-bold">Total Bill: ${totalBill}</h3>
      </div>
    </div>
  );
};

export default Cart;
