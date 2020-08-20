import { createAsyncThunk } from '@reduxjs/toolkit';
import CIService from '../services.js';

export const fetchCIOptions = createAsyncThunk('ci/fetchCIOptions', async (companyId) => {
    return await CIService.fetchCIOptions(companyId);
});

export const submitCIForPreview = createAsyncThunk('ci/submitCIForPreview', async (_, { getState }) => {
    const { newCI } = getState().ci;
    const file = await CIService.generateCIFiles(newCI);
    return window.URL.createObjectURL(file);
})