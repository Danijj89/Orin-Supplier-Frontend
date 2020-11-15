import { fetchWithAuth } from './utils.js';


const createCommercialInvoice = async (shipmentId, commercialInvoice) => {
    const configs = {
        method: 'post',
        url: `documents/ci`,
        params: {
            shipment: shipmentId
        },
        data: commercialInvoice
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const DocumentService = {
    createCommercialInvoice
};

export default DocumentService;