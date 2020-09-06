import { createAsyncThunk } from '@reduxjs/toolkit';
import CIService from '../services.js';
import { deleteOrderDocument, updateOrderDocument } from '../../orders/duck/slice.js';

export const submitCIForPreview = createAsyncThunk('ci/submitCIForPreview', async (_, { getState }) => {
    const newCI = {...getState().ci.newCI };
    newCI.items = [].concat.apply(
        [], Object.values(newCI.items).reduce((acc, items) => {
        acc.push(items);
        return acc;
    }, []));
    const file = await CIService.generateCIFiles(newCI);
    return window.URL.createObjectURL(file);
})

export const submitCI = createAsyncThunk('ci/submitCI', async (_, { getState, dispatch }) => {
    const newCI = {...getState().ci.newCI };
    newCI.items = [].concat.apply(
        [], Object.values(newCI.items).reduce((acc, items) => {
            acc.push(items);
            return acc;
        }, []));
    const ci = await CIService.createNewCI(newCI);
    dispatch(updateOrderDocument({ docType: 'CI', doc: ci }));
    return ci;
})

export const deleteCI = createAsyncThunk('ci/deleteCI', async (id, { getState, dispatch }) => {
    const status = await CIService.deleteCI(id);
    if (!status) return Promise.reject('Unable to delete CI');
    const { currentPOId } = getState().orders;
    dispatch(deleteOrderDocument({ id: currentPOId, docType: 'CI' }));
    return status;
})

export const startNewCI = createAsyncThunk('ci/startNewCI',
    async (orderId, { getState }) => {
    const { user, company } = getState().home;
    return CIService.fetchNewCIData(user._id, company._id, orderId);
})