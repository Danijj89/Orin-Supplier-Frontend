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

export const createLead = createAsyncThunk('leads/createLead',
    async ({ data }, { rejectWithValue }) => {
        try {
            return await LeadService.createLead(data);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateLead = createAsyncThunk('leads/updateLead',
    async ({ leadId, update }, {rejectWithValue}) => {
        try {
            await LeadService.updateLead(leadId, update);
            return { leadId, update };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });