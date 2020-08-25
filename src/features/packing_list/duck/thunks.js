import { createAsyncThunk } from '@reduxjs/toolkit';
import PLService from '../services.js';

export const fetchPLOptions = createAsyncThunk('pl/fetchPLOptions', async (companyId) => {
    return await PLService.fetchPLOptions(companyId);
});