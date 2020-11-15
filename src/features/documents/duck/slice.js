import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { SESSION_NEW_DOCUMENT } from '../../../app/sessionKeys.js';
import { createCommercialInvoice } from './thunks.js';


export const documentAdapter = createEntityAdapter({
    selectId: document => document._id,
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
});

const initialState = documentAdapter.getInitialState({
    dataStatus: 'IDLE',
    status: 'IDLE',
    error: null
});

const documentsSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        cleanNewDocument: (state, action) => {
            sessionStorage.removeItem(SESSION_NEW_DOCUMENT);
        },
        cleanDocumentError: (state, action) => {
            state.error = null;
        }
    },
    extraReducers: {
        [createCommercialInvoice.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [createCommercialInvoice.fulfilled]: (state, action) => {
            documentAdapter.upsertOne(state, action.payload);
            state.status = 'IDLE';
        },
        [createCommercialInvoice.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanNewDocument, cleanDocumentError } = documentsSlice.actions;

export default documentsSlice.reducer;