import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchCompanies } from './thunks.js';

export const companiesAdapter = createEntityAdapter({
    selectId: company => company._id,
    sortComparer: (a, b) => b._id.localeCompare(a._id)
});

const initialState = companiesAdapter.getInitialState({
    dataStatus: 'IDLE',
    status: 'IDLE',
    error: null
});

const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        cleanCompanyState: (state) => {
            state.dataStatus = 'IDLE';
            state.status = 'IDLE';
            state.error = null;
        }
    },
    extraReducers: {
        [fetchCompanies.pending]: (state) => {
            state.dataStatus = 'PENDING';
        },
        [fetchCompanies.fulfilled]: (state, action) => {
            companiesAdapter.setAll(state, action.payload);
            state.dataStatus = 'FULFILLED';
        },
        [fetchCompanies.rejected]: (state, action) => {
            state.dataStatus = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanCompanyState } = companiesSlice.actions;

export default companiesSlice.reducer;