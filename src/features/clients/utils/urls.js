
export const getClientOverviewURL = queryParams => {
    const filters = {};
    if ('lastOrder' in queryParams) filters.lastOrder = queryParams.lastOrder.split(',')
    if ('orderCountYTD' in queryParams) filters.orderCountYTD = queryParams.orderCountYTD.split(',');
    if ('assignedTo' in queryParams) filters.assignedTo = queryParams.assignedTo;
    if ('name' in queryParams) filters.name = queryParams.name;
    return filters;
};

export const getClientUrl = (clientId, options = {}) => {
    if (!clientId) throw new Error('Client ID required to get its URL.');
    let url = `/home/clients/${clientId}`;
    const queryString = [];
    queryString.push(options.tab ? `tab=${options.tab}` : 'tab=addresses');
    return url.concat('?', queryString.join('&'));
};