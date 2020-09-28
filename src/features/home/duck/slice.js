import { createSlice } from '@reduxjs/toolkit';
import { SESSION_APP_DEFAULTS, SESSION_USER } from '../../../app/sessionKeys.js';
import {
    addNewAddress,
    deleteAddress, fetchCompany, fetchUsersByCompanyId,
    resetPassword,
    updateAddress,
    updateCurrentUser,
    updateDefaultAddress
} from './thunks.js';

const initialState = {
    user: JSON.parse(sessionStorage.getItem(SESSION_USER)),
    defaults: JSON.parse(sessionStorage.getItem(SESSION_APP_DEFAULTS)),
    company: null,
    companyUsers: [],
    status: 'IDLE',
    error: null,
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSessionInfo: (state, action) => {
            const { user, defaults } = action.payload
            state.user = user;
            state.defaults = defaults;
        },
        cleanError: (state, action) => {
            state.status = 'IDLE';
            state.error = null;
        }
    },
    extraReducers: {
        [updateCurrentUser.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateCurrentUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            sessionStorage.setItem(SESSION_USER, JSON.stringify(state.user));
        },
        [updateCurrentUser.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [addNewAddress.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [addNewAddress.fulfilled]: (state, action) => {
            const { addresses } = action.payload;
            state.company.addresses = addresses;
        },
        [addNewAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [resetPassword.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [resetPassword.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [deleteAddress.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [deleteAddress.fulfilled]: (state, action) => {
            const id = action.payload;
            state.company.addresses = state.company.addresses.filter(add => add._id !== id);
        },
        [deleteAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateAddress.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateAddress.fulfilled]: (state, action) => {
            const { id, ...newAddress } = action.payload;
            state.company.addresses = state.company.addresses.map(address => address._id === id ? newAddress : address);
        },
        [updateAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateDefaultAddress.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateDefaultAddress.fulfilled]: (state, action) => {
            state.company.defaultAddress = action.payload;
        },
        [updateDefaultAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [fetchCompany.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchCompany.fulfilled]: (state, action) => {
            state.company = action.payload;
            state.status = 'FULFILLED';
        },
        [fetchCompany.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [fetchUsersByCompanyId.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchUsersByCompanyId.fulfilled]: (state, action) => {
            state.companyUsers = action.payload;
            state.status = 'FULFILLED';
        },
        [fetchUsersByCompanyId.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { setSessionInfo, cleanError } = homeSlice.actions;

export default homeSlice.reducer;