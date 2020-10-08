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
    async ({id, ...update}, {rejectWithValue}) => {
        try {
            return await ClientService.updateClient(id, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });