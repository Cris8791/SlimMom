import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async (query) => {
        const response = await axios.get(`/api/products?query=${query}`);
        return response.data;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        searchResults: [],
        loading: false
    },
    reducers: {},
    extraReducers: {
        [searchProducts.pending]: (state) => {
            state.loading = true;
        },
        [searchProducts.fulfilled]: (state, action) => {
            state.searchResults = action.payload;
            state.loading = false;
        },
        [searchProducts.rejected]: (state) => {
            state.loading = false;
        }
    }
});

export default productSlice.reducer;
