import { createAsyncThunk } from '@reduxjs/toolkit';
import CIService from '../services.js';

export const fetchCIOptions = createAsyncThunk('ci/fetchCIOptions', async (companyId) => {
    return await CIService.fetchCIOptions(companyId);
})