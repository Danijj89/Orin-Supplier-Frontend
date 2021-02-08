import { createAsyncThunk } from '@reduxjs/toolkit';
import AppService from '../../features/api/AppService.js';

export const signIn = createAsyncThunk('app/signIn',
    async ({ sessionData }, { rejectWithValue }) => {
        try {
            return await AppService.signIn(sessionData);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });