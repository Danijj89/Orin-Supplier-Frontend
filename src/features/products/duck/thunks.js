import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductService from '../../api/ProductService.js';

export const fetchProducts = createAsyncThunk('products/fetchProducts',
    async (companyId, { rejectWithValue }) => {
        try {
            return await ProductService.fetchProducts(companyId);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });