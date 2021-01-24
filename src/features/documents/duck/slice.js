import { createSlice } from '@reduxjs/toolkit';
import { SESSION_NEW_DOCUMENT } from 'app/sessionKeys.js';
import { downloadShipmentDocument } from './thunks.js';

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
    },
    extraReducers: {
        [downloadShipmentDocument.pending]: (state, action) => {
            state.dataStatus = 'PENDING';
        },
        [downloadShipmentDocument.fulfilled]: (state, action) => {
            state.dataStatus = 'FULFILLED';
        },
        [downloadShipmentDocument.rejected]: (state, action) => {
            state.dataStatus = 'REJECTED';
            state.error = action.payload.message;
        },
    }
});

export const { cleanNewDocument, cleanDocumentState } = documentsSlice.actions;

export default documentsSlice.reducer;