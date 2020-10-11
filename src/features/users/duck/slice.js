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
    reducers: {
        setUsers: (state, action) => {
            usersAdapter.upsertMany(state, action.payload);
        }
    },
    extraReducers: {}
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;