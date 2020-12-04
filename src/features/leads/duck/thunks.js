import { createAsyncThunk } from '@reduxjs/toolkit';
import LeadService from '../../api/LeadService.js';

export const fetchLeads = createAsyncThunk('leads/fetchLeads',
    async ({ companyId }, { rejectWithValue }) => {
        try {
            return await LeadService.fetchLeads(companyId);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });