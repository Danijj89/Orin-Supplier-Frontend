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

const fetchShipmentById = async (id) => {
    const configs = {
        method: 'get',
        url: `shipments/${id}`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const ShipmentService = {
    createShipment,
    fetchShipments,
    fetchShipmentById
};

export default ShipmentService;