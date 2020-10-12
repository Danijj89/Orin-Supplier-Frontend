import { createSlice } from '@reduxjs/toolkit';
import { SESSION_COOKIE, SESSION_USER_ID } from '../sessionKeys.js';
import { signIn } from './thunks.js';

const initialState = {
    userId: JSON.parse(sessionStorage.getItem(SESSION_USER_ID)),
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
        }
    }
});

export const { cleanError } = appSlice.actions;

export default appSlice.reducer;