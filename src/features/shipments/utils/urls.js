
export const getShipmentURL = (shipmentId, options = {}) => {
    if (!shipmentId) throw new Error('Order ID required to get its URL.');
    let url = `/home/shipments/${shipmentId}`;
    const queryString = [];
    queryString.push(options.mode ? `mode=${options.mode}` : 'mode=view');
    queryString.push(options.tab ? `tab=${options.tab}` : 'tab=details');
    if (options.split) queryString.push(`split=${options.split}`);
    if (options.subTab) queryString.push(`subTab=${options.subTab}`);
    return url.concat('?', queryString.join('&'));
};