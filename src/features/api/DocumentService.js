import { fetchWithAuth } from './utils.js';

const downloadShipmentDocument = async (shipmentId, documentId, ext) => {
    const configs = {
        method: 'get',
        url: 'documents/shipment',
        params: {
            shipment: shipmentId,
            document: documentId,
            ext
        },
        responseType: 'blob'
    };
    return await fetchWithAuth(configs);
};

const downloadOrder = async (orderId, ext, splitId, items) => {
    const configs = {
        method: 'get',
        url: 'documents/order',
        params: {
            order: orderId,
            ext, 
            splitId,
            items,
        },
        responseType: 'blob'
    };
    return await fetchWithAuth(configs);
};

const DocumentService = {
    downloadShipmentDocument,
    downloadOrder
};

export default DocumentService;