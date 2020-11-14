import { createAsyncThunk } from '@reduxjs/toolkit';
import ShipmentService from '../../api/ShipmentService.js';

export const createCommercialInvoice = createAsyncThunk('documents/createCommercialInvoice',
    async ({ shipmentId, commercialInvoice }, { rejectWithValue }) => {
        try {
            return await ShipmentService.fetchShipments(shipmentId, commercialInvoice);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });