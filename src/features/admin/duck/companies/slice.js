import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchCompanies } from './thunks.js';
import { createUser } from '../../../users/duck/thunks.js';

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
        },
        [createUser.pending]: (state) => {
            state.status = 'PENDING';
        },
        [createUser.fulfilled]: (state, action) => {
            const newUser = action.payload;
            const changes = {
                users: [...state.entities[newUser.company].users]
            };
            changes.users.push(newUser);
            companiesAdapter.updateOne(state, { id: newUser.company, changes });
            state.status = 'FULFILLED';
        },
        [createUser.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
    }
});

export const { cleanCompanyState } = companiesSlice.actions;

export default companiesSlice.reducer;