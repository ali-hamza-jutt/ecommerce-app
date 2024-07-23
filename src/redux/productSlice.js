import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../apis/fetchProducts';

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

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.products; // Ensure data structure matches
            })
            .addCase(fetchProductsThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;
