import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { resetPassword, updateUser } from './thunks.js';

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
    extraReducers: {
        [updateUser.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateUser.fulfilled]: (state, action) => {
            const { _id: id, ...changes } = action.payload;
            usersAdapter.updateOne(state, { id, changes });
            state.status = 'IDLE';
        },
        [updateUser.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
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
        },
    }
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;