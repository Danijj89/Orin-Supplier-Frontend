import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createPermission, fetchPermissions } from './thunks.js';

export const permissionAdapter = createEntityAdapter({
    selectId: permission => permission._id,
    sortComparer: (a, b) => a._id.localeCompare(b._id)
});

const initialState = permissionAdapter.getInitialState({
    dataStatus: 'IDLE',
    status: 'IDLE',
    error: null
});

const permissionsSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {
        cleanPermissionState: (state) => {
            state.dataStatus = 'IDLE';
            state.status = 'IDLE';
            state.error = null;
        }
    },
    extraReducers: {
        [fetchPermissions.pending]: (state) => {
            state.dataStatus = 'PENDING';
        },
        [fetchPermissions.fulfilled]: (state, action) => {
            permissionAdapter.setAll(state, action.payload);
            state.dataStatus = 'FULFILLED';
        },
        [fetchPermissions.rejected]: (state, action) => {
            state.dataStatus = 'REJECTED';
            state.error = action.payload.message;
        },
        [createPermission.pending]: (state) => {
            state.status = 'PENDING';
        },
        [createPermission.fulfilled]: (state, action) => {
            permissionAdapter.upsertOne(state, action.payload);
            state.status = 'FULFILLED';
        },
        [createPermission.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanPermissionState } = permissionsSlice.actions;

export default permissionsSlice.reducer;