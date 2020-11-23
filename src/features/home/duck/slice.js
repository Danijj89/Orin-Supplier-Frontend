import { createSlice } from '@reduxjs/toolkit';
import {
    addNewAddress, createCompanyBankDetail,
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
        cleanHomeState: (state, action) => {
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
            state.status = 'FULFILLED';
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
            state.status = 'FULFILLED';
        },
        [updateCompany.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [addNewAddress.fulfilled]: (state, action) => {
            const { addresses } = action.payload;
            state.company.addresses = addresses;
            state.status = 'FULFILLED';
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
            const addressIdx = state.company.addresses.findIndex(add => add._id === id);
            state.company.addresses[addressIdx].active = false;
            state.status = 'FULFILLED';
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
            state.status = 'FULFILLED';
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
            state.status = 'FULFILLED';
        },
        [updateDefaultAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [createCompanyBankDetail.fulfilled]: (state, action) => {
            const { bankDetails } = action.payload;
            state.company.bankDetails = bankDetails;
            state.status = 'FULFILLED';
        },
        [createCompanyBankDetail.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanHomeState } = homeSlice.actions;

export default homeSlice.reducer;