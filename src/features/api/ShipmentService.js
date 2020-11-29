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

const updateShipmentShell = async (id, update) => {
    const configs = {
        method: 'put',
        url: `shipments/${id}/shell`,
        data: update
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const updateShipment = async (id, update) => {
    const configs = {
        method: 'put',
        url: `shipments/${id}`,
        data: update
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const createDocument = async (id, doc) => {
    const configs = {
        method: 'post',
        url: `shipments/${id}/documents`,
        data: doc
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const deleteShipment = async (id) => {
    const configs = {
        method: 'delete',
        url: `shipments/${id}`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const ShipmentService = {
    createShipment,
    fetchShipments,
    fetchShipmentById,
    updateShipmentShell,
    updateShipment,
    createDocument,
    deleteShipment
};

export default ShipmentService;