import { createSlice } from '@reduxjs/toolkit';
import { SESSION_APP_DATA, SESSION_COOKIE, SESSION_USER } from '../sessionKeys.js';
import { signIn } from './thunks.js';
import accessControl from 'accesscontrol';

const initialState = {
    user: JSON.parse(sessionStorage.getItem(SESSION_USER)),
    appData: JSON.parse(sessionStorage.getItem(SESSION_APP_DATA)),
    ac: null,
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
        setAccessControl: (state, action) => {
            state.ac = new accessControl.AccessControl(state.appData.grants);
        }
    },
    extraReducers: {
        [signIn.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [signIn.fulfilled]: (state, action) => {
            const { user, expires, appData } = action.payload;
            state.user = user;
            state.appData = appData;
            sessionStorage.setItem(SESSION_COOKIE, JSON.stringify(new Date(Date.now() + expires)));
            sessionStorage.setItem(SESSION_USER, JSON.stringify(user));
            sessionStorage.setItem(SESSION_APP_DATA, JSON.stringify(appData));
            state.status = 'FULFILLED';
        },
        [signIn.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanAppState, setAccessControl } = appSlice.actions;

export default appSlice.reducer;