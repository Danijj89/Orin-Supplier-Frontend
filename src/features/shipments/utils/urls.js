export const getShipmentURL = (shipmentId, options = {}) => {
    if (!shipmentId) throw new Error('Shipment ID required to get its URL.');
    let url = `/home/shipments/${ shipmentId }`;
    const queryString = [];
    queryString.push(options.tab ? `tab=${ options.tab }` : 'tab=orders');
    return url.concat('?', queryString.join('&'));
};