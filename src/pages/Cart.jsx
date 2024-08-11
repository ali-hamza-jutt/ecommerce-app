import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ref, onValue, remove } from 'firebase/database';
import { db } from '../Authentication/firebase.js'; 
import { setCartItems, selectCartItems } from '../redux/cartSlice.js'; 
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import LoadingAnimation from '../components/LoadingAnimation.jsx';

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
    return (
      <div>
        <Navbar />
        <LoadingAnimation />
        <Footer />
      </div>
    );
  }

  if (!user.isAuthenticated) {
    return <p>Please log in to view your cart.</p>;
  }

  const totalBill = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price) || 0;
    const itemQuantity = parseInt(item.quantity) || 1;
    const itemTotalPrice = parseFloat(item.totalPrice) || itemPrice * itemQuantity;
    return total + itemTotalPrice;
  }, 0);

  return (
    <>
      <Navbar />
      <div className="w-full p-8 min-h-96 bg-white">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-2xl text-gray-800">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden"
                style={{ border: '1px solid #e0e0e0' }} // Subtle border for a modern look
              >
                <img
                  className="w-full h-48 object-cover"
                  src={`https://${item.imageUrl}`}
                  alt={item.name}
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold">{item.name}</h3>
                  <p className="mt-2 text-gray-600">Color: {item.color}</p>
                  <p className="mt-1 text-gray-600">Quantity: {item.quantity}</p>
                  <p className="mt-1 font-bold">Price: ${item.price}</p>
                  <p className="mt-1 font-bold">Total: ${item.totalPrice}</p>
                </div>
                <div className="flex justify-between p-4 bg-gray-100">
                  <button
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => handleEdit(item)}
                  >
                    <EditTwoToneIcon />
                  </button>
                  <button
                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                    onClick={() => handleDelete(item.productId)}
                  >
                    <DeleteOutlineSharpIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <h3 className="text-3xl font-bold text-gray-800">Total Bill: ${totalBill}</h3>
          <button
            className="mt-6 px-8 py-4 bg-green-500 text-white text-2xl font-bold rounded-full shadow-lg hover:bg-green-600 transition duration-300"
            onClick={() => navigate('/checkout')}
          >
            Checkout <ShoppingCartCheckoutIcon sx={{ fontSize: 36, marginLeft: 1 }} />
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
