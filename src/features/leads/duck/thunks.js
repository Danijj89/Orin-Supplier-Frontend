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
    async ({ leadId, update }, { rejectWithValue }) => {
        try {
            await LeadService.updateLead(leadId, update);
            return { leadId, update };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const createLeadAddress = createAsyncThunk('leads/createLeadAddress',
    async ({ leadId, address }, { rejectWithValue }) => {
        try {
            return await LeadService.createLeadAddress(leadId, address);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const deleteLeadAddress = createAsyncThunk('leads/deleteLeadAddress',
    async ({ leadId, addressId }, { rejectWithValue }) => {
        try {
            await LeadService.deleteLeadAddress(leadId, addressId);
            return { leadId, addressId };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateLeadDefaultAddress = createAsyncThunk('leads/updateLeadDefaultAddress',
    async ({ leadId, addressId }, { rejectWithValue }) => {
        try {
            await LeadService.updateLeadDefaultAddress(leadId, addressId);
            return { leadId, addressId };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateLeadAddress = createAsyncThunk('leads/updateLeadAddress',
    async ({ leadId, addressId, update }, { rejectWithValue }) => {
        try {
            await LeadService.updateLeadAddress(leadId, addressId, update);
            return { leadId, addressId, update };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });