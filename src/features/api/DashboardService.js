import { fetchWithAuth } from './utils.js';

const fetchDashboardData = async () => {
    const configs = {
        method: 'get',
        url: 'dashboard',
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const DashboardService = {
    fetchDashboardData,
};

export default DashboardService;
