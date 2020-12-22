import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchUsers, inactivateUser, updateUser } from 'features/home/duck/users/thunks.js';

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
        cleanUserState: (state) => {
            state.dataStatus = 'IDLE';
            state.status = 'IDLE';
            state.error = null;
        }
    },
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.dataStatus = 'PENDING';
        },
        [fetchUsers.fulfilled]: (state, action) => {
            usersAdapter.upsertMany(state, action.payload);
            state.dataStatus = 'FULFILLED';
        },
        [fetchUsers.rejected]: (state, action) => {
            state.dataStatus = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateUser.pending]: (state) => {
            state.status = 'PENDING';
        },
        [updateUser.fulfilled]: (state, action) => {
            const { _id: id, ...changes } = action.payload;
            usersAdapter.updateOne(state, { id, changes });
            state.status = 'FULFILLED';
        },
        [updateUser.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [inactivateUser.pending]: (state) => {
            state.status = 'PENDING';
        },
        [inactivateUser.fulfilled]: (state, action) => {
            const { userId: id } = action.payload;
            usersAdapter.updateOne(state, { id, changes: { active: false } });
            state.status = 'FULFILLED';
        },
        [inactivateUser.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanUserState } = usersSlice.actions;

export default usersSlice.reducer;