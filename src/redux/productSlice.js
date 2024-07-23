import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../apis/fetchProducts';

// Thunk to fetch products based on category ID
export const fetchProductsThunk = createAsyncThunk(
    'products/fetchProducts',
    async (categoryId) => {
        try {
            console.log('Fetching products for category ID:', categoryId); // Debug log
            const data = await fetchProducts(categoryId);
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

// Initial state for the products slice
const initialState = {
    items: [],   // Ensure items is initialized as an empty array
    status: 'idle',
    error: null,
};

// Create the products slice
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProducts: (state) => {
            state.items = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.products || []; // Ensure items is always an array
            })
            .addCase(fetchProductsThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// Export actions and reducer
export const { clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
