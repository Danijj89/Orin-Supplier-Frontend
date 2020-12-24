import { resourcesAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';


export const {
    selectAll: selectAllResources
} = resourcesAdapter.getSelectors(state => state.resources);

export const selectResourceDataStatus = state => state.resources.dataStatus;
export const selectResourceStatus = state => state.resources.status;
export const selectResourceError = state => state.resources.error;

export const selectAllResourceIds = createSelector(
    selectAllResources,
    resources => resources.map(resource => resource._id)
);

