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

const createProduct = async (product) => {
    const configs = {
        method: 'post',
        url: 'products',
        data: product
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const ProductService = {
    fetchProducts,
    createProduct
};

export default ProductService;