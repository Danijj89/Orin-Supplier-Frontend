import { createAsyncThunk } from '@reduxjs/toolkit';
import AppService from '../../features/api/AppService.js';

export const signIn = createAsyncThunk('app/signIn',
    async (credentials, { rejectWithValue }) => {
        try {
            return await AppService.signIn(credentials);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });