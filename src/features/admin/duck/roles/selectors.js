import { ordersAdapter } from '../../../orders/duck/slice.js';
import { createSelector } from '@reduxjs/toolkit';


export const {
    selectAll: selectAllRoles
} = ordersAdapter.getSelectors(state => state.roles);

export const selectRoleDataStatus = state => state.roles.dataStatus;
export const selectRoleStatus = state => state.roles.status;
export const selectRoleError = state => state.roles.error;

export const selectAllRoleIds = createSelector(
    selectAllRoles,
    roles => roles.map(role => role._id)
);

