import { createAsyncThunk } from '@reduxjs/toolkit';
import ShipmentService from '../../api/ShipmentService.js';

export const createShipment = createAsyncThunk('shipments/createShipment',
    async ({ data }, { rejectWithValue }) => {
        try {
            return await ShipmentService.createShipment(data);
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

export const updateShipmentInfo = createAsyncThunk('shipments/updateShipmentInfo',
    async ({ id, ...update }, { rejectWithValue }) => {
        try {
            await ShipmentService.updateShipmentInfo(id, update);
            return { id, update };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateShipment = createAsyncThunk('shipments/updateShipment',
    async ({ id, update }, { rejectWithValue }) => {
        try {
            return await ShipmentService.updateShipment(id, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const createDocument = createAsyncThunk('shipments/createDocument',
    async ({ id, doc }, { rejectWithValue }) => {
        try {
            return await ShipmentService.createDocument(id, doc);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const deleteShipment = createAsyncThunk('shipments/deleteShipment',
    async ({ shipmentId }, { rejectWithValue }) => {
        try {
            await ShipmentService.deleteShipment(shipmentId);
            return shipmentId;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });