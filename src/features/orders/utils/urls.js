export const getOrderURL = (orderId, options = {}) => {
    if (!orderId) throw new Error('Order ID required to get its URL.');
    let url = `/home/orders/${ orderId }`;
    const queryString = [];
    queryString.push(options.mode ? `mode=${ options.mode }` : 'mode=view');
    queryString.push(options.tab ? `tab=${ options.tab }` : 'tab=details');
    if (options.split) queryString.push(`split=${ options.split }`);
    if (options.subTab) queryString.push(`subTab=${ options.subTab }`);
    return url.concat('?', queryString.join('&'));
};

export const getOrderTableFiltersFromURL = queryParams => {
    const filters = {};
    if ('crd' in queryParams) filters.crd = queryParams.crd.split(',');
    if ('toName' in queryParams) filters.toName = queryParams.toName;
    if ('procurement' in queryParams) filters.procurement = queryParams.procurement.split(',');
    if ('production' in queryParams) filters.production = queryParams.production.split(',');
    if ('qa' in queryParams) filters.qa = queryParams.qa.split(',');

    return filters;
};

export const getOrderTableURL = filters =>
    filters.reduce((acc, filter) =>
        `${ acc }&${ filter.field }=${ Array.isArray(filter.value)
            ? filter.value.join(',')
            : filter.value }`, '/home/orders?');