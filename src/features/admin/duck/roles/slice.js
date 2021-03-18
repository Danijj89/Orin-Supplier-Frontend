import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createRole, fetchRoles, updateRole, updateRoleDescription } from './thunks.js';

export const rolesAdapter = createEntityAdapter({
    selectId: role => role._id,
    sortComparer: (a, b) => b._id.localeCompare(a._id)
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
            state.status = 'PENDING';
        },
        [createRole.fulfilled]: (state, action) => {
            rolesAdapter.upsertOne(state, action.payload);
            state.status = 'FULFILLED';
        },
        [createRole.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateRole.pending]: (state) => {
            state.status = 'PENDING';
        },
        [updateRole.fulfilled]: (state, action) => {
            const { roleId: id, update: changes } = action.payload;
            rolesAdapter.updateOne(state, { id, changes });
            state.status = 'FULFILLED';
        },
        [updateRole.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateRoleDescription.pending]: (state) => {
            state.status = 'PENDING';
        },
        [updateRoleDescription.fulfilled]: (state, action) => {
            const { roleId: id, update } = action.payload;
            const name = { ...state.entities[id].name };
            name.label[update.language] = update.name;
            const description = { ...state.entities[id].description };
            description.label[update.language] = update.description;
            rolesAdapter.updateOne(state, { id, changes: { name, description } });
            state.status = 'FULFILLED';
        },
        [updateRoleDescription.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanRoleState } = rolesSlice.actions;

export default rolesSlice.reducer;