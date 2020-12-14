import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchRoles } from './thunks.js';
import { ordersAdapter } from '../../../orders/duck/slice.js';


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
        [fetchRoles.pending]: (state, action) => {
            state.dataStatus = 'PENDING';
        },
        [fetchRoles.fulfilled]: (state, action) => {
            ordersAdapter.setAll(state, action.payload);
            state.dataStatus = 'FULFILLED';
        },
        [fetchRoles.rejected]: (state, action) => {
            state.dataStatus = 'REJECTED';
            state.error = action.payload.message;
        },
    }
});

export const { cleanRoleState } = rolesSlice.actions;

export default rolesSlice.reducer;