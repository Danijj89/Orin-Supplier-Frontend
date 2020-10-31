import { createAsyncThunk } from '@reduxjs/toolkit';
import ShipmentService from '../../api/ShipmentService.js';

export const createShipment = createAsyncThunk('shipments/createShipment',
    async (shipment, {rejectWithValue}) => {
        try {
            return await ShipmentService.createShipment(shipment);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const fetchShipments = createAsyncThunk('shipments/fetchShipments',
    async ({ companyId }, {rejectWithValue}) => {
        try {
            return await ShipmentService.fetchShipments(companyId);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });