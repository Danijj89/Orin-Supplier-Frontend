import { createAsyncThunk } from '@reduxjs/toolkit';
import ShipmentService from '../../api/ShipmentService.js';

export const createShipment = createAsyncThunk('shipments/createShipment',
    async ({ shipment }, { rejectWithValue }) => {
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
    async ({ shipmentId, update }, { rejectWithValue }) => {
        try {
            return await ShipmentService.updateShipmentShell(shipmentId, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateShipmentInfo = createAsyncThunk('shipments/updateShipmentInfo',
    async ({ shipmentId, update }, { rejectWithValue }) => {
        try {
            return await ShipmentService.updateShipmentInfo(shipmentId, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateShipment = createAsyncThunk('shipments/updateShipment',
    async ({ shipmentId, update }, { rejectWithValue }) => {
        try {
            return await ShipmentService.updateShipment(shipmentId, update);
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