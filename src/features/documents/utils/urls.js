
export const getDocumentUrl = (docType, shipmentId, options = {}) => {
    if (!shipmentId) throw new Error('Shipment ID required to get the document URL.');
    if (!docType) throw new Error('Document type required to get the document URL.');
    let url = `/home/documents/${docType.toLowerCase()}/${options.edit ? 'edit' : 'new'}`;
    const queryString = [];
    queryString.push(`shipment=${shipmentId}`);
    queryString.push(options.step ? `step=${options.step}` : 'step=details');
    if (options.document) queryString.push(`document=${options.document}`);
    return url.concat('?', queryString.join('&'));
};