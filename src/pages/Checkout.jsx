import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { ref, set, push } from 'firebase/database';
import { db } from '../Authentication/firebase.js';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../redux/cartSlice.js';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const cartItems = useSelector(selectCartItems);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const totalBill = cartItems.reduce((total, item) => total + item.totalPrice, 0);

  const initialValues = {
    country: '',
    state: '',
    city: '',
    streetAddress: '',
    zipCode: '',
    cardNumber: '',
    cardHolderName: '',
    cardExpiry: '',
    cvc: '',
  };

  const validationSchema = Yup.object({
    country: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    streetAddress: Yup.string().required('Required'),
    zipCode: Yup.string().required('Required'),
    cardNumber: Yup.string().required('Required'),
    cardHolderName: Yup.string().required('Required'),
    cardExpiry: Yup.string().required('Required'),
    cvc: Yup.string().required('Required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    if (step === 4) {
      const orderData = {
        userId: user.uid,
        items: cartItems.map(item => ({
          productId: item.productId,
          name: item.name,
          color: item.color,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.totalPrice,
          imageUrl: item.imageUrl || '', // Ensure imageUrl is not undefined
        })),
        totalBill,
        shippingAddress: {
          country: values.country,
          state: values.state,
          city: values.city,
          streetAddress: values.streetAddress,
          zipCode: values.zipCode,
        },
        orderDate: new Date().toISOString(),
      };

      console.log('Order Data:', orderData); // Log the order data before pushing to Firebase

      const ordersRef = ref(db, `orders/${user.uid}`);
      const newOrderRef = push(ordersRef); // Create a new child node for each order
      set(newOrderRef, orderData)
        .then(() => {
          console.log('Order placed successfully');
          navigate('/order');
        })
        .catch((error) => {
          console.error('Error placing order:', error);
        });
    } else {
      setStep(step + 1);
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            {step === 1 && (
              <div>
                <h3 className="text-xl font-bold mb-2">Cart Review</h3>
                {cartItems.map((item) => (
                  <div key={item.productId} className="mb-4">
                    <img src={`https://${item.imageUrl}`} alt={item.name} className="mb-2" />
                    <h4 className="font-bold">{item.name}</h4>
                    <p>Color: {item.color}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                    <p>Total Price: ${item.totalPrice}</p>
                  </div>
                ))}
                <p className="font-bold">Total Bill: ${totalBill}</p>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-xl font-bold mb-2">Shipping Address</h3>
                <div className="mb-4">
                  <label htmlFor="country" className="block mb-2">Country</label>
                  <Field id="country" name="country" className="border border-gray-300 rounded p-2 w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="state" className="block mb-2">State</label>
                  <Field id="state" name="state" className="border border-gray-300 rounded p-2 w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="city" className="block mb-2">City</label>
                  <Field id="city" name="city" className="border border-gray-300 rounded p-2 w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="streetAddress" className="block mb-2">Street Address</label>
                  <Field id="streetAddress" name="streetAddress" className="border border-gray-300 rounded p-2 w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="zipCode" className="block mb-2">Zip Code</label>
                  <Field id="zipCode" name="zipCode" className="border border-gray-300 rounded p-2 w-full" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-xl font-bold mb-2">Payment Details</h3>
                <div className="mb-4">
                  <label htmlFor="cardNumber" className="block mb-2">Card Number</label>
                  <Field id="cardNumber" name="cardNumber" className="border border-gray-300 rounded p-2 w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="cardHolderName" className="block mb-2">Card Holder Name</label>
                  <Field id="cardHolderName" name="cardHolderName" className="border border-gray-300 rounded p-2 w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="cardExpiry" className="block mb-2">Card Expiry</label>
                  <Field id="cardExpiry" name="cardExpiry" className="border border-gray-300 rounded p-2 w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="cvc" className="block mb-2">CVC</label>
                  <Field id="cvc" name="cvc" className="border border-gray-300 rounded p-2 w-full" />
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-xl font-bold mb-2">Order Confirmation</h3>
                <div className="mb-4">
                  <h4 className="font-bold">Shipping Address</h4>
                  <p>Country: {values.country}</p>
                  <p>State: {values.state}</p>
                  <p>City: {values.city}</p>
                  <p>Street Address: {values.streetAddress}</p>
                  <p>Zip Code: {values.zipCode}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-bold">Cart Items</h4>
                  {cartItems.map((item) => (
                    <div key={item.productId} className="mb-4">
                      <img src={`https://${item.imageUrl}`} alt={item.name} className="mb-2" />
                      <h4 className="font-bold">{item.name}</h4>
                      <p>Color: {item.color}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                      <p>Total Price: ${item.totalPrice}</p>
                    </div>
                  ))}
                </div>
                <p className="font-bold">Total Bill: ${totalBill}</p>
              </div>
            )}

            <div className="mt-4">
              {step > 1 && (
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </button>
              )}
              {step < 4 && (
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => setStep(step + 1)}
                  disabled={isSubmitting}
                >
                  Next
                </button>
              )}
              {step === 4 && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  disabled={isSubmitting}
                >
                  Process Order
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Checkout;
