import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { LANGUAGE } from '../../../constants.js';
import { fetchCIOptions } from './thunks.js';

export const defaultRowValues = ['', '', '', '', 0, 'PCS', 0, 0];

const commercialInvoiceAdapter = createEntityAdapter({
    selectId: ci => ci._id,
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const getCIDefaultValues = () => ({
    ciRef: null,
    from: null,
    fromName: null,
    fromAdd: null,
    toName: null,
    toAdd: null,
    date: new Date().toISOString(),
    com: null,
    notes: null,
    scRef: null,
    poRefs: [],
    paymentRef: null,
    currency: 'USD',
    marks: null,
    createdBy: null,
    fileName: null,
    headers: LANGUAGE.commercialInvoice.createCIProductTable.defaultHeaders,
    items: [],
    totalQ: null,
    totalA: 0
});

const initialState = commercialInvoiceAdapter.getInitialState({
    status: 'IDLE',
    error: null,
    steps: LANGUAGE.commercialInvoice.createCI.steps,
    activeStep: 0,
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
        }
    },
    newCI: getCIDefaultValues(),
    previewFileURL: null
});

const commercialInvoiceSlice = createSlice({
    name: 'ci',
    initialState,
    reducers: {
        startNewCI: (state, action) => {
            state.activeStep = 0;
            state.newCI = getCIDefaultValues();
        },
        submitCIDetails: (state, action) => {
            state.activeStep += 1;
            for (const [key, value] of Object.entries(action.payload)) {
                state.newCI[key] = value;
            }
        },
        prevStep: (state, action) => {
            if (state.activeStep > 0) {
                state.activeStep -= 1;
            }
        },
        nextStep: (state, action) => {
            if (state.activeStep < 2) {
                state.activeStep += 1;
            }
        },
    },
    extraReducers: {
        [fetchCIOptions.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchCIOptions.fulfilled]: (state, action) => {
            state.autocomplete = action.payload;
            state.status = 'IDLE';
        },
        [fetchCIOptions.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        }
    }
});

export const { startNewCI, submitCIDetails, prevStep, nextStep } = commercialInvoiceSlice.actions;

export default commercialInvoiceSlice.reducer;