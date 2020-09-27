import { createSlice } from '@reduxjs/toolkit';
import { SESSION_APP_DEFAULTS, SESSION_COMPANY, SESSION_USER } from '../../../app/sessionKeys.js';
import { addNewAddress, resetPassword, updateCurrentUser } from './thunks.js';

const initialState = {
    user: JSON.parse(sessionStorage.getItem(SESSION_USER)),
    company: JSON.parse(sessionStorage.getItem(SESSION_COMPANY)),
    defaults: JSON.parse(sessionStorage.getItem(SESSION_APP_DEFAULTS)),
    status: 'IDLE',
    error: null,
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSessionInfo: (state, action) => {
            const { user, company, defaults } = action.payload
            state.user = user;
            state.company = company;
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
            state.status = 'IDLE';
        },
        [updateCurrentUser.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [addNewAddress.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [addNewAddress.fulfilled]: (state, action) => {
            state.company.addresses.push(action.payload);
            sessionStorage.setItem(SESSION_COMPANY, JSON.stringify(state.company));
            state.status = 'IDLE';
        },
        [addNewAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [resetPassword.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [resetPassword.fulfilled]: (state, action) => {
            state.status = 'IDLE';
        },
        [resetPassword.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { setSessionInfo, cleanError } = homeSlice.actions;

export default homeSlice.reducer;