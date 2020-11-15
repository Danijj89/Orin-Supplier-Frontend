import { createAsyncThunk } from '@reduxjs/toolkit';
import DocumentService from '../../api/DocumentService.js';

export const createCommercialInvoice = createAsyncThunk('documents/createCommercialInvoice',
    async ({ shipmentId, commercialInvoice }, { rejectWithValue }) => {
        try {
            return await DocumentService.createCommercialInvoice(shipmentId, commercialInvoice);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });