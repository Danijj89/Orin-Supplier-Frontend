import { createAsyncThunk } from '@reduxjs/toolkit';
import CIService from '../services.js';
import { deleteOrderDocument, updateOrderDocument } from '../../orders/duck/slice.js';

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

export const deleteCI = createAsyncThunk('ci/deleteCI', async (id, { getState, dispatch }) => {
    const status = await CIService.deleteCI(id);
    if (!status) return Promise.reject('Unable to delete CI');
    const { selectedOrder } = getState().orders;
    dispatch(deleteOrderDocument({ id: selectedOrder._id, docType: 'CI' }));
    return status;
})

export const startNewCI = createAsyncThunk('ci/startNewCI',
    async (orderId, { getState }) => {
    const { _id: companyId } = getState().home.company;
    return CIService.fetchNewCIData(companyId, orderId);
})