import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { LANGUAGE } from '../../../constants.js';
import { deleteCI, fetchCIOptions, submitCI, submitCIForPreview } from './thunks.js';

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
    to: null,
    toName: null,
    toAdd: null,
    date: new Date().toISOString(),
    com: 'China',
    pol: '',
    pod: '',
    notes: '',
    scRef: '',
    paymentRef: '',
    currency: 'USD',
    marks: '',
    createdBy: null,
    fileName: null,
    poRefs: [],
    poIds: [],
    headers: LANGUAGE.commercialInvoice.createCIProductTable.defaultHeaders,
    items: [],
    totalQ: null,
    totalA: 0
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
    newCI: getCIDefaultValues(),
    previewFileURL: null
});

const commercialInvoiceSlice = createSlice({
    name: 'ci',
    initialState,
    reducers: {
        startNewCI: (state, action) => {
            state.newCI = getCIDefaultValues();
        },
        submitCIDetails: (state, action) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state.newCI[key] = value;
            }
        },
        submitTableInfo: (state, action) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state.newCI[key] = value;
            }
        },
        setCIDataFromPO: (state, action) => {
            const { from, fromName, fromAdd, to, toName, toAdd, pol, pod } = action.payload;
            state.newCI.from = to;
            state.newCI.fromName = toName;
            state.newCI.fromAdd = toAdd;
            state.newCI.to = from;
            state.newCI.toName = fromName;
            state.newCI.toAdd = fromAdd;
            state.newCI.pol = pol;
            state.newCI.pod = pod;
            //TODO also copy items
        }
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
        },
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
    }
});

export const { startNewCI, submitCIDetails, submitTableInfo, setCIDataFromPO } = commercialInvoiceSlice.actions;

export default commercialInvoiceSlice.reducer;