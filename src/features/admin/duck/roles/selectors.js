import { ordersAdapter } from '../../../orders/duck/slice.js';
import { createSelector } from '@reduxjs/toolkit';

const excludedRoles = ['super_user', 'company_admin'];

export const {
    selectAll: selectAllRoles,
    selectEntities: selectRolesMap
} = ordersAdapter.getSelectors(state => state.roles);

export const selectRoleDataStatus = state => state.roles.dataStatus;
export const selectRoleStatus = state => state.roles.status;
export const selectRoleError = state => state.roles.error;

export const selectAllActiveRoles = createSelector(
    selectAllRoles,
    roles => roles.filter(role => role.active)
);

export const selectAllActiveRoleIds = createSelector(
    selectAllActiveRoles,
    roles => roles.map(role => role._id)
);

export const selectActiveCompanyRoleIds = createSelector(
    selectAllActiveRoleIds,
    roles => roles.filter(role => !excludedRoles.includes(role))
);

