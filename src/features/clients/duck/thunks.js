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