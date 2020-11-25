import { createSlice } from '@reduxjs/toolkit';
import {
    addNewAddress, createCompanyBankDetail,
    deleteAddress, deleteCompanyBankDetail,
    fetchCompanyById,
    updateAddress,
    updateCompany, updateCompanyBankDetail,
    updateDefaultAddress
} from './thunks.js';

const initialState = {
    company: null,
    dataStatus: 'IDLE',
    status: 'IDLE',
    error: null,
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        cleanHomeError: (state, action) => {
            state.dataStatus = 'IDLE';
            state.status = 'IDLE';
            state.error = null;
        }
    },
    extraReducers: {
        [fetchCompanyById.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchCompanyById.fulfilled]: (state, action) => {
            state.company = action.payload;
            state.dataStatus = 'FULFILLED';
        },
        [fetchCompanyById.rejected]: (state, action) => {
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
            const addressIdx = state.company.addresses.findIndex(add => add._id === id);
            state.company.addresses[addressIdx].active = false;
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
            state.company = action.payload;
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
        },
        [createCompanyBankDetail.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [createCompanyBankDetail.fulfilled]: (state, action) => {
            state.company = action.payload;
            state.status = 'IDLE';
        },
        [createCompanyBankDetail.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [deleteCompanyBankDetail.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [deleteCompanyBankDetail.fulfilled]: (state, action) => {
            state.company = action.payload;
            state.status = 'IDLE';
        },
        [deleteCompanyBankDetail.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateCompanyBankDetail.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateCompanyBankDetail.fulfilled]: (state, action) => {
            state.company = action.payload;
            state.status = 'IDLE';
        },
        [updateCompanyBankDetail.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanHomeError } = homeSlice.actions;

export default homeSlice.reducer;