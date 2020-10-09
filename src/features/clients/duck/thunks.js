import { createAsyncThunk } from '@reduxjs/toolkit';
import ClientService from '../../api/ClientService.js';

export const fetchClients = createAsyncThunk('client/fetchClients',
    async (id, { rejectWithValue }) => {
        try {
            return await ClientService.fetchClients(id);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const createClient = createAsyncThunk('client/createClient',
    async (client, { rejectWithValue }) => {
        try {
            return await ClientService.createClient(client);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const fetchClientById = createAsyncThunk('client/fetchClientById',
    async (id, { rejectWithValue }) => {
        try {
            return await ClientService.fetchClientById(id);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateClient = createAsyncThunk('client/updateClient',
    async ({ id, ...update }, { rejectWithValue }) => {
        try {
            return await ClientService.updateClient(id, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const addNewClientAddress = createAsyncThunk('client/addNewClientAddress',
    async ({ clientId, ...address }, { rejectWithValue }) => {
        try {
            return await ClientService.addNewClientAddress(clientId, address);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const deleteClientAddress = createAsyncThunk('client/deleteClientAddress',
    async ({ clientId, addressId }, { rejectWithValue }) => {
        try {
            await ClientService.deleteClientAddress(clientId, addressId);
            return { clientId, addressId };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateDefaultClientAddress = createAsyncThunk('client/updateDefaultClientAddress',
    async ({ clientId, addressId }, { rejectWithValue }) => {
        try {
            await ClientService.updateDefaultClientAddress(clientId, addressId);
            return { clientId, addressId };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateAddress = createAsyncThunk('client/updateAddress',
    async ({ clientId, _id, ...update }, { rejectWithValue }) => {
        try {
            await ClientService.updateAddress(clientId, _id, update);
            return { clientId, _id, ...update };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const addNewClientContact = createAsyncThunk('client/addNewClientContact',
    async ({ clientId, ...contact }, { rejectWithValue }) => {
        try {
            return await ClientService.addNewClientContact(clientId, contact);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const deleteContact = createAsyncThunk('client/deleteContact',
    async ({ clientId, contactId }, { rejectWithValue }) => {
        try {
            await ClientService.deleteContact(clientId, contactId);
            return { clientId, contactId };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });