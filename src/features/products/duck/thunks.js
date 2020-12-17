import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductService from '../../api/ProductService.js';

export const fetchProducts = createAsyncThunk('products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            return await ProductService.fetchProducts();
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const createProduct = createAsyncThunk('products/createProduct',
    async ({ product }, { rejectWithValue }) => {
        try {
            return await ProductService.createProduct(product);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const deleteProduct = createAsyncThunk('products/deleteProduct',
    async ({ productId }, { rejectWithValue }) => {
        try {
            await ProductService.deleteProduct(productId);
            return productId;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateProduct = createAsyncThunk('products/updateProduct',
    async ({ productId, update }, { rejectWithValue }) => {
        try {
            return await ProductService.updateProduct(productId, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });