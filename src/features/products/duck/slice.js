import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createProduct, deleteProduct, fetchProducts, updateProduct } from './thunks.js';

export const productsAdapter = createEntityAdapter({
    selectId: product => product._id,
    sortComparer: (a, b) => a.sku.localeCompare(b.sku)
});

const initialState = productsAdapter.getInitialState({
    dataStatus: 'IDLE',
    status: 'IDLE',
    error: null
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        cleanProductState: (state, action) => {
            state.dataStatus = 'IDLE';
            state.status = 'IDLE';
            state.error = null;
        },
        resetProductStatus: state => {
            state.status = 'IDLE';
        }
    },
    extraReducers: {
        [fetchProducts.pending]: (state, action) => {
            state.dataStatus = 'PENDING';
        },
        [fetchProducts.fulfilled]: (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.dataStatus = 'FULFILLED';
        },
        [fetchProducts.rejected]: (state, action) => {
            state.dataStatus = 'REJECTED';
            state.error = action.payload.message;
        },
        [createProduct.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [createProduct.fulfilled]: (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'FULFILLED';
        },
        [createProduct.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [deleteProduct.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [deleteProduct.fulfilled]: (state, action) => {
            productsAdapter.updateOne(state, { id: action.payload, changes: { active: false } });
            state.status = 'FULFILLED';
        },
        [deleteProduct.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateProduct.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateProduct.fulfilled]: (state, action) => {
            const { _id: id, ...changes } = action.payload;
            productsAdapter.updateOne(state, { id, changes });
            state.status = 'FULFILLED';
        },
        [updateProduct.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanProductState, resetProductStatus } = productsSlice.actions;

export default productsSlice.reducer;