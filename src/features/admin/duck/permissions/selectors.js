import { permissionAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';

export const {
    selectAll
} = permissionAdapter.getSelectors(state => state.permissions);

export const selectPermissionDataStatus = state => state.permissions.dataStatus;
export const selectPermissionError = state => state.permissions.error;

export const selectAllPermissionsIds = createSelector(
    selectAll,
    permissions => permissions.map(permission => permission._id)
);