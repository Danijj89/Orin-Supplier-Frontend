import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
    createUser,
    fetchUsers,
    resetPassword,
    sendResetCode,
    updateUser,
    updateUserStatus,
    updateCompanyUserRoles
} from 'features/home/duck/users/thunks.js';

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
        },
        resetUserStatus: state => {
            state.status = 'IDLE';
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
        [updateUserStatus.pending]: (state) => {
            state.status = 'PENDING';
        },
        [updateUserStatus.fulfilled]: (state, action) => {
            const { userId: id, update } = action.payload;
            usersAdapter.updateOne(state, { id, changes: { active: update.active } });
            state.status = 'FULFILLED';
        },
        [updateUserStatus.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [createUser.pending]: (state) => {
            state.status = 'PENDING';
        },
        [createUser.fulfilled]: (state, action) => {
            usersAdapter.upsertOne(state, action.payload);
            state.status = 'FULFILLED';
        },
        [createUser.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [sendResetCode.pending]: (state) => {
            state.status = 'PENDING';
        },
        [sendResetCode.fulfilled]: (state) => {
            state.status = 'FULFILLED';
        },
        [sendResetCode.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [resetPassword.pending]: (state) => {
            state.status = 'PENDING';
        },
        [resetPassword.fulfilled]: (state) => {
            state.status = 'FULFILLED';
        },
        [resetPassword.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateCompanyUserRoles.pending]: (state) => {
            state.status = 'PENDING';
        },
        [updateCompanyUserRoles.fulfilled]: (state, action) => {
            const { userId: id, update } = action.payload;
            usersAdapter.updateOne(state, { id, changes: { roles: update.roles } });
            state.status = 'FULFILLED';
        },
        [updateCompanyUserRoles.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }

    }
});

export const { cleanUserState, resetUserStatus } = usersSlice.actions;

export default usersSlice.reducer;

