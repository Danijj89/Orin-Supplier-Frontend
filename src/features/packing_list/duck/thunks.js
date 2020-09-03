import { createAsyncThunk } from '@reduxjs/toolkit';
import PLService from '../services.js';
import { deleteOrderDocument, updateOrderDocument } from '../../orders/duck/slice.js';

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
});

export const submitPL = createAsyncThunk(
    'pl/submitPL',
    async (_, { getState, dispatch }) => {
        const { newPL } = getState().pl;
        const pl = await PLService.createNewPL(newPL);
        dispatch(updateOrderDocument({ docType: 'PL', doc: pl }));
        return pl;
    }
);

export const deletePL = createAsyncThunk('pl/deletePL', async (id, { getState, dispatch }) => {
    const status = await PLService.deletePL(id);
    if (!status) return Promise.reject('Unable to delete PL');
    const { currentPO } = getState().orders;
    dispatch(deleteOrderDocument({ id: currentPO._id, docType: 'PL' }));
    return status;
})