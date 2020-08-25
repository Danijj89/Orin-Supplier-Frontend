import { createAsyncThunk } from '@reduxjs/toolkit';
import CIService from '../services.js';
import { updateOrderDocument } from '../../orders/duck/slice.js';

export const fetchCIOptions = createAsyncThunk('ci/fetchCIOptions', async (companyId) => {
    return await CIService.fetchCIOptions(companyId);
});

export const submitCIForPreview = createAsyncThunk('ci/submitCIForPreview', async (_, { getState }) => {
    const { newCI } = getState().ci;
    const file = await CIService.generateCIFiles(newCI);
    return window.URL.createObjectURL(file);
})

export const submitCI = createAsyncThunk('ci/submitCI', async (_, { getState, dispatch }) => {
    const { newCI } = getState().ci;
    const ci = await CIService.createNewCI(newCI);
    dispatch(updateOrderDocument({ docType: 'CI', doc: ci }));
    return ci;
})