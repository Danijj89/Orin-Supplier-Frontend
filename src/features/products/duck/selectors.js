import { productsAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';

export const {
    selectAll: selectAllProducts,
    selectEntities: selectProductsMap
} = productsAdapter.getSelectors(state => state.products);

export const selectProductStatus = state => state.products.status;
export const selectProductError = state => state.products.error;
export const selectActiveProducts = createSelector(
    state => state.products.entities,
    entities => Object.values(entities).filter(p => p.active)
);
