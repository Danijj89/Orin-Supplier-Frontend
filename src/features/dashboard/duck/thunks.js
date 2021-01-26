import { createAsyncThunk } from '@reduxjs/toolkit';
import DashboardService from '../../api/DashboardService.js';

export const fetchDashboardData = createAsyncThunk(
    'dashboard/fetchDashboadData',
    async (_, { rejectWithValue }) => {
        try {
            return await DashboardService.fetchDashboardData();
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
