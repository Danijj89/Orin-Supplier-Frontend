import { createSlice } from '@reduxjs/toolkit';
import { SESSION_APP_DATA, SESSION_COOKIE, SESSION_USER } from '../sessionKeys.js';
import { signIn } from './thunks.js';

const initialState = {
    user: JSON.parse(localStorage.getItem(SESSION_USER)),
    appData: JSON.parse(localStorage.getItem(SESSION_APP_DATA)),
    status: 'IDLE',
    error: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        cleanAppState: (state, action) => {
            state.status = 'IDLE';
            state.error = null;
            state.user = null;
            state.appData = null;
        },
        resetAppStatus: state => {
            state.status = 'IDLE';
            state.error = null;
        }
    },
    extraReducers: {
        [signIn.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [signIn.fulfilled]: (state, action) => {
            const { company, roles, appData } = action.payload;
            const user = JSON.parse(localStorage.getItem('_authing_user'));
            user.company = company;
            user.roles = roles;
            state.user = user;
            state.appData = appData;
            localStorage.setItem(SESSION_COOKIE, JSON.stringify(new Date(user.tokenExpiredAt)));
            localStorage.setItem(SESSION_USER, JSON.stringify(user));
            localStorage.setItem(SESSION_APP_DATA, JSON.stringify(appData));
            state.status = 'FULFILLED';
        },
        [signIn.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanAppState, resetAppStatus } = appSlice.actions;

export default appSlice.reducer;