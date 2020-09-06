import { createAsyncThunk } from '@reduxjs/toolkit';
import PLService from '../services.js';
import { deleteOrderDocument, updateOrderDocument } from '../../orders/duck/slice.js';

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
    const { currentPOId } = getState().orders;
    dispatch(deleteOrderDocument({ id: currentPOId, docType: 'PL' }));
    return status;
});

export const startNewPL = createAsyncThunk('pl/startNewPL',
    async (orderId, { getState }) => {
        const { user, company } = getState().home;
        return PLService.fetchNewPLData(user._id, company._id, orderId);
    });