import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './thunks.js';

export const usersAdapter = createEntityAdapter({
    selectId: user => user._id,
    sortComparer: (a,b) => a.name.localeCompare(b.name)
});

const initialState = usersAdapter.getInitialState({
    status: 'IDLE',
    error: null
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchUsers.fulfilled]: (state, action) => {
            usersAdapter.upsertMany(state, action.payload);
            state.status = 'FULFILLED';
        },
        [fetchUsers.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
    }
});

export default usersSlice.reducer;