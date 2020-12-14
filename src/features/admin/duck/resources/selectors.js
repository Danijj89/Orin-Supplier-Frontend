import { resourcesAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';


export const {
    selectAll
} = resourcesAdapter.getSelectors(state => state.resources);

export const selectAllResources = createSelector(
    selectAll,
    resources => resources.map(resource => resource._id)
);

