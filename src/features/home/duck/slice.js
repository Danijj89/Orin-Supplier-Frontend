import { createSlice } from '@reduxjs/toolkit';
import { SESSION_APP_DEFAULTS, SESSION_COMPANY, SESSION_USER } from '../../../app/sessionKeys.js';
import { updateCurrentUser } from './thunks.js';

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
        }
    },
    extraReducers: {
        [updateCurrentUser.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateCurrentUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.status = 'IDLE';
        },
        [updateCurrentUser.rejected]: (state, action) => {
            state.status = 'ERROR';
            state.error = action.error.message;
        }
    }
});

export const selectCurrentUser = state => state.home.user;
export const selectCurrentCompany = state => state.home.company;
export const selectCurrentDefaults = state => state.home.defaults;

export const { setSessionInfo } = homeSlice.actions;

export default homeSlice.reducer;