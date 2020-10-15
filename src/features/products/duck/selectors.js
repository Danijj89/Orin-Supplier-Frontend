import { productsAdapter } from './slice.js';

export const {
    selectAll: selectAllProducts,
    selectEntities: selectProductsMap
} = productsAdapter.getSelectors(state => state.products);

export const selectProductStatus = state => state.products.status;