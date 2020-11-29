import { productsAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';

export const {
    selectAll: selectAllProducts,
    selectEntities: selectProductsMap
} = productsAdapter.getSelectors(state => state.products);

export const selectProductDataStatus = state => state.products.dataStatus;
export const selectProductStatus = state => state.products.status;
export const selectProductError = state => state.products.error;
export const selectAllActiveProducts = createSelector(
    selectAllProducts,
    products => products.filter(p => p.active)
);

export const selectActiveProductsMap = createSelector(
    selectAllActiveProducts,
    products => products.reduce((map, product) => {
        map[product._id] = product;
        return map;
    }, {})
);
