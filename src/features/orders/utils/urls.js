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

export const getFiltersFromURL = queryString => {
    const filters = {};
    if ('crd' in queryString) filters.crd = queryString.crd.split(',');
    if ('toName' in queryString) filters.toName = queryString.toName;
    if ('procurement' in queryString) filters.procurement = queryString.procurement.split(',');
    if ('production' in queryString) filters.production = queryString.production.split(',');
    if ('qa' in queryString) filters.qa = queryString.qa.split(',');
    return filters;
};

export const getOrderTableURL = filters =>
    filters.reduce((filter, acc) =>
        `${ acc }&${ filter.field }=${ Array.isArray(filter.value)
            ? filter.value.join(',')
            : filter.value }`, '/home/orders/filter?');