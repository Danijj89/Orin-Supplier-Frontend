import { createAsyncThunk } from '@reduxjs/toolkit';
import CompanyService from '../../../api/CompanyService.js';

export const fetchCompanies = createAsyncThunk('companies/fetchCompanies',
    async (_, { rejectWithValue }) => {
        try {
            return await CompanyService.fetchCompanies();
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });