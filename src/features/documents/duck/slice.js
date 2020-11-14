import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { SESSION_NEW_DOCUMENT } from '../../../app/sessionKeys.js';


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
    extraReducers: {}
});

export const { cleanNewDocument, cleanDocumentError } = documentsSlice.actions;

export default documentsSlice.reducer;