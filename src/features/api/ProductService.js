import { fetchWithAuth } from './utils.js';

const fetchProducts = async () => {
    const configs = {
        method: 'get',
        url: 'products'
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
};

const deleteProduct = async (productId) => {
    const configs = {
        method: 'delete',
        url: `products/${productId}`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const updateProduct = async (id, update) => {
    const configs = {
        method: 'put',
        url: `products/${id}`,
        data: update
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const ProductService = {
    fetchProducts,
    createProduct,
    deleteProduct,
    updateProduct
};

export default ProductService;