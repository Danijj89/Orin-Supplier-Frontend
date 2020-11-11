import { createAsyncThunk } from '@reduxjs/toolkit';
import ShipmentService from '../../api/ShipmentService.js';

export const createShipment = createAsyncThunk('shipments/createShipment',
    async (shipment, { rejectWithValue }) => {
        try {
            return await ShipmentService.createShipment(shipment);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const fetchShipments = createAsyncThunk('shipments/fetchShipments',
    async ({ companyId }, { rejectWithValue }) => {
        try {
            return await ShipmentService.fetchShipments(companyId);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const fetchShipmentById = createAsyncThunk('shipments/fetchShipmentById',
    async ({ id }, { rejectWithValue }) => {
        try {
            return await ShipmentService.fetchShipmentById(id);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateShipmentShell = createAsyncThunk('shipments/updateShipmentShell',
    async ({ _id, ...update }, { rejectWithValue }) => {
        try {
            return await ShipmentService.updateShipmentShell(_id, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateShipmentInfo = createAsyncThunk('shipment/updateShipmentInfo',
    async ({ id, ...update }, { rejectWithValue }) => {
        try {
            await ShipmentService.updateShipmentInfo(id, update);
            return { id, update };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateShipmentProducts = createAsyncThunk('shipment/updateShipmentProducts',
    async ({ id, update }, { rejectWithValue }) => {
        try {
            return await ShipmentService.updateShipmentProducts(id, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })