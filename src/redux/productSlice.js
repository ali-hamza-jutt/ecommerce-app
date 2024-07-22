// productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../apis/fetchProducts'; // Import the function from api.js

export const fetchProductsThunk = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const data = await fetchProducts(); // Call the imported function
    console.log(data)
    return data;
  } catch (error) {
    throw new Error(error.message); // Handle errors
  }
});

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
        state.items = action.payload.products; // Adjust based on the actual structure of the response
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
