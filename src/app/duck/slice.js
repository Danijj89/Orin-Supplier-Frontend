import { createSlice } from '@reduxjs/toolkit';
import { SESSION_COOKIE, SESSION_USER_ID } from '../sessionKeys.js';
import { fetchSessionInfo, signIn } from './thunks.js';

const initialState = {
    userId: JSON.parse(sessionStorage.getItem(SESSION_USER_ID)),
    company: null,
    status: 'IDLE',
    error: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        cleanError: (state, action) => {
            state.status = 'IDLE';
            state.error = null;
        }
    },
    extraReducers: {
        [signIn.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [signIn.fulfilled]: (state, action) => {
            const { userId, expires } = action.payload;
            state.userId = userId
            sessionStorage.setItem(SESSION_COOKIE, JSON.stringify(new Date(Date.now() + expires)));
            sessionStorage.setItem(SESSION_USER_ID, JSON.stringify(userId));
            state.status = 'IDLE';
        },
        [signIn.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
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
        // [updateCurrentUser.pending]: (state, action) => {
        //     state.status = 'PENDING';
        // },
        // [updateCurrentUser.fulfilled]: (state, action) => {
        //     state.user = action.payload;
        //     sessionStorage.setItem(SESSION_USER, JSON.stringify(state.user));
        //     state.status = 'IDLE';
        // },
        // [updateCurrentUser.rejected]: (state, action) => {
        //     state.status = 'REJECTED';
        //     state.error = action.payload.message;
        // },
        // [addNewAddress.pending]: (state, action) => {
        //     state.status = 'PENDING';
        // },
        // [addNewAddress.fulfilled]: (state, action) => {
        //     const { addresses } = action.payload;
        //     state.company.addresses = addresses;
        //     state.status = 'IDLE';
        // },
        // [addNewAddress.rejected]: (state, action) => {
        //     state.status = 'REJECTED';
        //     state.error = action.payload.message;
        // },
        // [resetPassword.pending]: (state, action) => {
        //     state.status = 'PENDING';
        // },
        // [resetPassword.fulfilled]: (state, action) => {
        //     state.status = 'IDLE';
        // },
        // [resetPassword.rejected]: (state, action) => {
        //     state.status = 'REJECTED';
        //     state.error = action.payload.message;
        // },
        // [deleteAddress.pending]: (state, action) => {
        //     state.status = 'PENDING';
        // },
        // [deleteAddress.fulfilled]: (state, action) => {
        //     const id = action.payload;
        //     state.company.addresses = state.company.addresses.filter(add => add._id !== id);
        //     state.status = 'IDLE';
        // },
        // [deleteAddress.rejected]: (state, action) => {
        //     state.status = 'REJECTED';
        //     state.error = action.payload.message;
        // },
        // [updateAddress.pending]: (state, action) => {
        //     state.status = 'PENDING';
        // },
        // [updateAddress.fulfilled]: (state, action) => {
        //     const updatedAddress = action.payload;
        //
        //     state.company.addresses = state.company.addresses.map(
        //         address => address._id === updatedAddress._id ? updatedAddress : address);
        //     state.status = 'IDLE';
        // },
        // [updateAddress.rejected]: (state, action) => {
        //     state.status = 'REJECTED';
        //     state.error = action.payload.message;
        // },
        // [updateDefaultAddress.pending]: (state, action) => {
        //     state.status = 'PENDING';
        // },
        // [updateDefaultAddress.fulfilled]: (state, action) => {
        //     state.company.defaultAddress = state.company.addresses.find(address => address._id === action.payload);
        //     state.status = 'IDLE';
        // },
        // [updateDefaultAddress.rejected]: (state, action) => {
        //     state.status = 'REJECTED';
        //     state.error = action.payload.message;
        // },
        // [updateCompany.pending]: (state, action) => {
        //     state.status = 'PENDING';
        // },
        // [updateCompany.fulfilled]: (state, action) => {
        //     state.company = action.payload;
        //     state.status = 'IDLE';
        // },
        // [updateCompany.rejected]: (state, action) => {
        //     state.status = 'REJECTED';
        //     state.error = action.payload.message;
        // },
    }
});

export const { setCompany, cleanError } = appSlice.actions;

export default appSlice.reducer;