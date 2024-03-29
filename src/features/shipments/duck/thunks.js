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
    async (_, { rejectWithValue }) => {
        try {
            return await ShipmentService.fetchShipments();
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

export const updateShipment = createAsyncThunk('shipments/updateShipment',
    async ({ shipmentId, update }, { rejectWithValue }) => {
        try {
            return await ShipmentService.updateShipment(shipmentId, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const createDocument = createAsyncThunk('shipments/createDocument',
    async ({ shipmentId, document }, { rejectWithValue }) => {
        try {
            return await ShipmentService.createDocument(shipmentId, document);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateDocument = createAsyncThunk('shipments/updateDocument',
    async ({ shipmentId, documentId, update }, { rejectWithValue }) => {
        try {
            return await ShipmentService.updateDocument(shipmentId, documentId, update);
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

export const deleteDocument = createAsyncThunk('shipments/deleteDocument',
    async ({ shipmentId, documentId }, { rejectWithValue }) => {
        try {
            await ShipmentService.deleteDocument(shipmentId, documentId);
            return { shipmentId, documentId };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });