import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createProduct, deleteProduct, fetchProducts, updateProduct } from './thunks.js';

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
        },
        [createProduct.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [createProduct.fulfilled]: (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'IDLE';
        },
        [createProduct.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [deleteProduct.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [deleteProduct.fulfilled]: (state, action) => {
            productsAdapter.removeOne(state, action.payload);
            state.status = 'IDLE';
        },
        [deleteProduct.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateProduct.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateProduct.fulfilled]: (state, action) => {
            const { id, update: changes } = action.payload;
            productsAdapter.updateOne(state, { id, changes });
            state.status = 'IDLE';
        },
        [updateProduct.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export default productsSlice.reducer;