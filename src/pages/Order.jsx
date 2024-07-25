import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ref, onValue } from 'firebase/database';
import { db } from '../Authentication/firebase.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
const Order = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.isAuthenticated) {
      const ordersRef = ref(db, `orders/${user.uid}`);
      onValue(ordersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setOrders(Object.values(data));
        } else {
          setOrders([]);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user.isAuthenticated, user.uid]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user.isAuthenticated) {
    return <p>Please log in to view your orders.</p>;
  }

  const formatDateTime = (dateTimeString) => {
    const [date, time] = dateTimeString.split('T');
    const formattedTime = time.split('.')[0];
    return { formattedDate: date, formattedTime };
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        orders.map((order, index) => {
          const { formattedDate, formattedTime } = formatDateTime(order.orderDate);
          return (
            <div key={index} className="mb-4 p-4" style={{ backgroundColor: '#EEEDEB', borderRadius: '8px' }}>
              <h3 className="text-xl font-bold mb-2">Order {index + 1}</h3>
              <div>
                <p className="font-bold">Order Date: {formattedDate}</p>
                <p className="font-bold">Order Time: {formattedTime}</p>
              </div>
              <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Shipping Details</h3>
                <p>Country: {order.shippingAddress.country}</p>
                <p>State: {order.shippingAddress.state}</p>
                <p>City: {order.shippingAddress.city}</p>
                <p>Street Address: {order.shippingAddress.streetAddress}</p>
                <p>Zip Code: {order.shippingAddress.zipCode}</p>
              </div>
              <div className="mb-4">
                <h4 className="font-bold my-3">Cart Items</h4>
                {order.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 p-4"
                    style={{ backgroundColor: '#FFF', borderRadius: '8px' }}
                  >
                    <img
                      className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                      src={`https://${item.imageUrl}`}
                      alt={item.name}
                    />
                    <div className="flex-grow">
                      <h4 className="font-bold">{item.name}</h4>
                      <p>Color: {item.color}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                      <p>Total Price: ${item.totalPrice}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-bold">Total Bill: ${order.totalBill}</p>
             
            </div>
          );
        })
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Order;
