import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ref, onValue } from 'firebase/database';
import { db } from '../Authentication/firebase.js';

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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="mb-4 border p-4 rounded">
            <h3 className="text-lg font-bold">Order {index + 1}</h3>
            <div className="mb-2">
              <h4 className="font-bold">Shipping Address</h4>
              <p>Country: {order.shippingAddress.country}</p>
              <p>State: {order.shippingAddress.state}</p>
              <p>City: {order.shippingAddress.city}</p>
              <p>Street Address: {order.shippingAddress.streetAddress}</p>
              <p>Zip Code: {order.shippingAddress.zipCode}</p>
            </div>
            <div className="mb-2">
              <h4 className="font-bold">Cart Items</h4>
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="border p-2 rounded mb-2">
                    <img src={`https://${item.imageUrl}`} alt={item.name} className="mb-2" />
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Color:</strong> {item.color}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Price:</strong> ${item.price}</p>
                  <p><strong>Total Price:</strong> ${item.totalPrice}</p>
                </div>
              ))}
            </div>
            <p className="font-bold">Total Bill: ${order.totalBill}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Order;
