import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice.js';
import userReducer from './userSlice.js'
import cartReducer from './cartSlice.js'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
