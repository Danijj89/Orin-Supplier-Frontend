import { fetchWithAuth } from './utils.js';

const fetchProducts = async (id) => {
    const configs = {
        method: 'get',
        url: 'products',
        params: {
            company: id
        }
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const ProductService = {
    fetchProducts
};

export default ProductService;