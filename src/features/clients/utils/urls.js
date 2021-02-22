
export const getClientOverviewURL = () => '/home/clients';
export const getClientUrl = (clientId, options = {}) => {
    if (!clientId) throw new Error('Order ID required to get its URL.');
    let url = `/home/clients/${clientId}`;
    const queryString = [];
    queryString.push(options.tab ? `tab=${options.tab}` : 'tab=addresses');
    return url.concat('?', queryString.join('&'));
};