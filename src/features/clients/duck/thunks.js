import { createAsyncThunk } from '@reduxjs/toolkit';
import ClientService from '../../api/ClientService.js';

export const fetchClients = createAsyncThunk('clients/fetchClients',
    async ({ companyId }, { rejectWithValue }) => {
        try {
            return await ClientService.fetchClients(companyId);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const createClient = createAsyncThunk('clients/createClient',
    async ({ client }, { rejectWithValue }) => {
        try {
            return await ClientService.createClient(client);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const fetchClientById = createAsyncThunk('clients/fetchClientById',
    async (id, { rejectWithValue }) => {
        try {
            return await ClientService.fetchClientById(id);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateClient = createAsyncThunk('clients/updateClient',
    async ({ clientId, update }, { rejectWithValue }) => {
        try {
            return await ClientService.updateClient(clientId, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const createClientAddress = createAsyncThunk('clients/createClientAddress',
    async ({ clientId, address }, { rejectWithValue }) => {
        try {
            return await ClientService.createClientAddress(clientId, address);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const deleteClientAddress = createAsyncThunk('clients/deleteClientAddress',
    async ({ clientId, addressId }, { rejectWithValue }) => {
        try {
            await ClientService.deleteClientAddress(clientId, addressId);
            return { clientId, addressId };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateDefaultClientAddress = createAsyncThunk('clients/updateDefaultClientAddress',
    async ({ clientId, addressId }, { rejectWithValue }) => {
        try {
            await ClientService.updateDefaultClientAddress(clientId, addressId);
            return { clientId, addressId };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateAddress = createAsyncThunk('clients/updateAddress',
    async ({ clientId, ...update }, { rejectWithValue }) => {
        try {
            await ClientService.updateAddress(clientId, update._id, update);
            return { clientId, ...update };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const addNewClientContact = createAsyncThunk('clients/addNewClientContact',
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

export const updateContact = createAsyncThunk('clients/updateContact',
    async ({ clientId, ...update }, { rejectWithValue }) => {
        try {
            await ClientService.updateContact(clientId, update._id, update);
            return { clientId, ...update };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const deleteClient = createAsyncThunk('clients/deleteClient',
    async ({ clientId }, { rejectWithValue }) => {
        try {
            await ClientService.deleteClient(clientId);
            return clientId;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateClientNotes = createAsyncThunk('clients/updateClientNotes',
    async ({ id, notes }, { rejectWithValue }) => {
        try {
            await ClientService.updateClientNotes(id, notes);
            return { id, notes };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });