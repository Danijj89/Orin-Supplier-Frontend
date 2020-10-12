import { createSlice } from '@reduxjs/toolkit';
import {
    addNewAddress,
    deleteAddress,
    fetchSessionInfo,
    updateAddress,
    updateCompany,
    updateDefaultAddress
} from './thunks.js';

const initialState = {
    company: null,
    status: 'IDLE',
    error: null,
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        cleanError: (state, action) => {
            state.status = 'IDLE';
            state.error = null;
        }
    },
    extraReducers: {
        [fetchSessionInfo.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchSessionInfo.fulfilled]: (state, action) => {
            state.company = action.payload;
            state.status = 'IDLE';
        },
        [fetchSessionInfo.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateCompany.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateCompany.fulfilled]: (state, action) => {
            state.company = action.payload;
            state.status = 'IDLE';
        },
        [updateCompany.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [addNewAddress.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [addNewAddress.fulfilled]: (state, action) => {
            const { addresses } = action.payload;
            state.company.addresses = addresses;
            state.status = 'IDLE';
        },
        [addNewAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [deleteAddress.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [deleteAddress.fulfilled]: (state, action) => {
            const id = action.payload;
            state.company.addresses = state.company.addresses.filter(add => add._id !== id);
            state.status = 'IDLE';
        },
        [deleteAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateAddress.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateAddress.fulfilled]: (state, action) => {
            const updatedAddress = action.payload;

            state.company.addresses = state.company.addresses.map(
                address => address._id === updatedAddress._id ? updatedAddress : address);
            state.status = 'IDLE';
        },
        [updateAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateDefaultAddress.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateDefaultAddress.fulfilled]: (state, action) => {
            state.company.defaultAddress = state.company.addresses.find(address => address._id === action.payload);
            state.status = 'IDLE';
        },
        [updateDefaultAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanError } = homeSlice.actions;

export default homeSlice.reducer;