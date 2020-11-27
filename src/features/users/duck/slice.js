import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchUsers, updateUser } from './thunks.js';

export const usersAdapter = createEntityAdapter({
    selectId: user => user._id,
    sortComparer: (a,b) => a.name.localeCompare(b.name)
});

const initialState = usersAdapter.getInitialState({
    dataStatus: 'IDLE',
    status: 'IDLE',
    error: null
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        cleanUserState: (state, action) => {
            state.dataStatus = 'IDLE';
            state.status = 'IDLE';
            state.error = null;
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
        [fetchUsers.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchUsers.fulfilled]: (state, action) => {
            usersAdapter.upsertMany(state, action.payload);
            state.dataStatus = 'FULFILLED';
        },
        [fetchUsers.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanUserState } = usersSlice.actions;

export default usersSlice.reducer;