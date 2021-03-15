export const getProductTableFiltersFromURL = queryParams => {
    const filters = {};
    if ('lastOrder' in queryParams) filters.lastOrder = queryParams.lastOrder.split(',');
    return filters;
};