import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        setCartItems: (state, action) => {
            state.items = action.payload;
        },
        addToCart: (state, action) => {
            state.items.push(action.payload);
        },
    },
});

export const { setCartItems, addToCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;
