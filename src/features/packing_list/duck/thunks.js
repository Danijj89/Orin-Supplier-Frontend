import { createAsyncThunk } from '@reduxjs/toolkit';
import PLService from '../services.js';

export const fetchPLOptions = createAsyncThunk(
    'pl/fetchPLOptions',
    async (companyId) => {
    return await PLService.fetchPLOptions(companyId);
});

export const submitPLForPreview = createAsyncThunk(
    'pl/submitPLForPreview',
    async (_, { getState }) => {
        const { newPL } = getState().pl;
        const file = await PLService.generatePLFiles(newPL);
        return window.URL.createObjectURL(file);
})