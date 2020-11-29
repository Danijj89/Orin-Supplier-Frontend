import { createSlice } from '@reduxjs/toolkit';
import { SESSION_NEW_DOCUMENT } from '../../../app/sessionKeys.js';

const initialState = {
    status: 'IDLE',
    error: null
};

const documentsSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        cleanNewDocument: (state, action) => {
            sessionStorage.removeItem(SESSION_NEW_DOCUMENT);
        },
        cleanDocumentState: (state, action) => {
            state.status = 'IDLE';
            state.error = null;
        }
    }
});

export const { cleanNewDocument, cleanDocumentState } = documentsSlice.actions;

export default documentsSlice.reducer;