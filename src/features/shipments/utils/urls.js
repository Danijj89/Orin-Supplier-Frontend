export const getShipmentURL = (shipmentId, options = {}) => {
    if (!shipmentId) throw new Error('Shipment ID required to get its URL.');
    let url = `/home/shipments/${ shipmentId }`;
    const queryString = [];
    queryString.push(options.tab ? `tab=${ options.tab }` : 'tab=orders');
    return url.concat('?', queryString.join('&'));
};

export const getShipmentTableFiltersFromURL = queryParams => {
    const filters = {};

    if ('consignee' in queryParams) filters.consignee = queryParams.consignee;
    if ('crd' in queryParams) filters.crd = queryParams.crd.split(',');
    if ('status' in queryParams) filters.status = queryParams.status.split(',');
    if ('del' in queryParams) filters.del = queryParams.del.split(',');
    return filters;
};