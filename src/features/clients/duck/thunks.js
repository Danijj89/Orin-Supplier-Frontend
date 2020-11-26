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
    async ({ clientId, addressId, update }, { rejectWithValue }) => {
        try {
            await ClientService.updateAddress(clientId, addressId, update);
            return { clientId, addressId, update };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const createClientContact = createAsyncThunk('clients/createClientContact',
    async ({ clientId, contact }, { rejectWithValue }) => {
        try {
            return await ClientService.createClientContact(clientId, contact);
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
    async ({ clientId, contactId, update }, { rejectWithValue }) => {
        try {
            await ClientService.updateContact(clientId, contactId, update);
            return { clientId, contactId, update };
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

export const updateDefaultClientContact = createAsyncThunk('clients/updateClientDefaultContact',
    async ({ clientId, contactId }, { rejectWithValue }) => {
        try {
            await ClientService.updateDefaultClientContact(clientId, contactId);
            return { clientId, contactId };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });