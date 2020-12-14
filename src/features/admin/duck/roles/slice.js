import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createRole, fetchRoles } from './thunks.js';

export const rolesAdapter = createEntityAdapter({
    selectId: role => role._id,
    sortComparer: (a, b) => b.name.localeCompare(a.name)
});

const initialState = rolesAdapter.getInitialState({
    dataStatus: 'IDLE',
    status: 'IDLE',
    error: null
});

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        cleanRoleState: (state) => {
            state.dataStatus = 'IDLE';
            state.status = 'IDLE';
            state.error = null;
        }
    },
    extraReducers: {
        [fetchRoles.pending]: (state) => {
            state.dataStatus = 'PENDING';
        },
        [fetchRoles.fulfilled]: (state, action) => {
            rolesAdapter.setAll(state, action.payload);
            state.dataStatus = 'FULFILLED';
        },
        [fetchRoles.rejected]: (state, action) => {
            state.dataStatus = 'REJECTED';
            state.error = action.payload.message;
        },
        [createRole.pending]: (state) => {
            state.dataStatus = 'PENDING';
        },
        [createRole.fulfilled]: (state, action) => {
            rolesAdapter.upsertOne(state, action.payload);
            state.dataStatus = 'FULFILLED';
        },
        [createRole.rejected]: (state, action) => {
            state.dataStatus = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanRoleState } = rolesSlice.actions;

export default rolesSlice.reducer;