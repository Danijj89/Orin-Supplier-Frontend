import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { deleteCI, startNewCI, submitCI, submitCIForPreview } from './thunks.js';

export const defaultRowValues = ['', '', '', '', 0, 'PCS', 0, 0];

const commercialInvoiceAdapter = createEntityAdapter({
    selectId: ci => ci._id,
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = commercialInvoiceAdapter.getInitialState({
    status: 'IDLE',
    error: null,
    autocomplete: {
        itemsRef: [],
        itemDescriptionMap: {},
        customerNames: [],
        customerAddressMap: {},
        ordersRef: [],
        orderItemMap: {
            items: [],
            totalQ: null,
            totalA: null
        },
        ports: []
    },
    newCI: null,
    previewFileURL: null
});

const commercialInvoiceSlice = createSlice({
    name: 'ci',
    initialState,
    reducers: {
        submitCIDetails: (state, action) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state.newCI[key] = value;
            }
        },
        submitTableInfo: (state, action) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state.newCI[key] = value;
            }
        }
    },
    extraReducers: {
        [submitCIForPreview.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [submitCIForPreview.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            state.previewFileURL = action.payload;
        },
        [submitCIForPreview.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [submitCI.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [submitCI.fulfilled]: (state, action) => {
            state.status = 'IDLE';
        },
        [submitCI.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [deleteCI.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [deleteCI.fulfilled]: (state, action) => {
            state.status = 'IDLE';
        },
        [deleteCI.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [startNewCI.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [startNewCI.fulfilled]: (state, action) => {
            const { newCI, ...rest } = action.payload;
            state.autocomplete = rest;
            state.newCI = newCI;
            state.status = 'IDLE';
        },
        [startNewCI.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
    }
});

export const { submitCIDetails, submitTableInfo } = commercialInvoiceSlice.actions;

export default commercialInvoiceSlice.reducer;