import { createSlice } from '@reduxjs/toolkit';
import { fetchDashboardData } from './thunks.js';

const initialState = {
    dashboardData: null,
    dataStatus: 'IDLE',
    status: 'IDLE',
    error: null,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        cleanDashboardState: (state, action) => {
            state.dataStatus = 'IDLE';
            state.status = 'IDLE';
            state.error = null;
        },
    },
    extraReducers: {
        [fetchDashboardData.pending]: (state, action) => {
            state.dataStatus = 'PENDING';
            state.status = 'PENDING';
        },
        [fetchDashboardData.fulfilled]: (state, action) => {
            state.dashboardData = action.payload;
            state.dataStatus = 'FULFILLED';
            state.status = 'FULFILLED';
        },
        [fetchDashboardData.rejected]: (state, action) => {
            state.dataStatus = 'REJECTED';
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
    },
});

export const { cleanDashboardState } = dashboardSlice.actions;

export default dashboardSlice.reducer;
