import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './thunks.js';

export const productsAdapter = createEntityAdapter({
    selectId: product => product._id,
    sortComparer: (a, b) => a.sku.localeCompare(b.sku)
});

const initialState = productsAdapter.getInitialState({
    status: 'IDLE',
    error: null
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProducts.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchProducts.fulfilled]: (state, action) => {
            productsAdapter.upsertMany(state, action.payload);
            state.status = 'FULFILLED';
        },
        [fetchProducts.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export default productsSlice.reducer;