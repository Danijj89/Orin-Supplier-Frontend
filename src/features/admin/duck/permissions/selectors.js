import { permissionAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';

export const {
    selectAll: selectAllPermissions
} = permissionAdapter.getSelectors(state => state.permissions);

export const selectPermissionDataStatus = state => state.permissions.dataStatus;
export const selectPermissionStatus = state => state.permissions.status;
export const selectPermissionError = state => state.permissions.error;

export const selectAllPermissionsIds = createSelector(
    selectAllPermissions,
    permissions => permissions.map(permission => permission._id)
);