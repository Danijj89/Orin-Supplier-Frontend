import { resourcesAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';


export const {
    selectAll
} = resourcesAdapter.getSelectors(state => state.resources);

export const selectResourceDataStatus = state => state.resources.dataStatus;
export const selectResourceError = state => state.resources.error;

export const selectAllResources = createSelector(
    selectAll,
    resources => resources.map(resource => resource._id)
);

