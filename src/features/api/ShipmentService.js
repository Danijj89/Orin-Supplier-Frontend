import { fetchWithAuth } from './utils.js';

const createShipment = async (shipment) => {
    const configs = {
        method: 'post',
        url: 'shipments',
        data: shipment
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const fetchShipments = async (companyId) => {
    const configs = {
        method: 'get',
        url: 'shipments',
        params: {
            company: companyId
        }
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const ShipmentService = {
    createShipment,
    fetchShipments
};

export default ShipmentService;