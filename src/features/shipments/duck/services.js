import { fetchWithAuth } from '../../api/utils.js';

const fetchNewShipmentData = async (userId, companyId) => {
    const configs = {
        method: 'get',
        url: '/shipments/new',
        params: {
            user: userId,
            company: companyId
        }
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const ShipmentService = {
    fetchNewShipmentData
};

export default ShipmentService;