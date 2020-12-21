import { createAsyncThunk } from '@reduxjs/toolkit';
import ResourceService from '../../../api/ResourceService.js';

export const fetchResources = createAsyncThunk('resources/fetchResources',
    async (_, { rejectWithValue }) => {
        try {
            return await ResourceService.fetchResources();
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const createResource = createAsyncThunk('resources/createResource',
    async ({ resource }, { rejectWithValue }) => {
        try {
            return await ResourceService.createResource(resource);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });