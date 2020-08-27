import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { LANGUAGE } from '../../../constants.js';
import { fetchPLOptions } from './thunks.js';

export const defaultRowValues = ['', '', '', '', { 'PCS': 0 }, { 'CTN': 0 }, 0, 0, 0];

const packingListAdapter = createEntityAdapter({
    selectId: pl => pl._id,
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const getPLDefaultValues = () => ({
    plRef: null,
    from: null,
    fromName: null,
    fromAdd: null,
    to: null,
    toName: null,
    toAdd: null,
    date: new Date().toISOString(),
    pol: '',
    pod: '',
    ciRef: null,
    poRefs: [],
    notes: '',
    marks: '',
    measurementUnit: 'CMB',
    weightUnit: 'KGS',
    createdBy: null,
    fileName: null,
    headers: LANGUAGE.packingList.createPLProductTable.defaultHeaders,
    items: [],
    totalQ: null,
    totalP: null,
    totalNW: 0,
    totalGW: 0,
    totalD: 0
});

const initialState = packingListAdapter.getInitialState({
    status: 'IDLE',
    error: null,
    autocomplete: {
        itemsRef: [],
        itemDescriptionMap: {}
    },
    newPL: getPLDefaultValues(),
    currentCI: null,
    previewFileURL: null
});

const packingListSlice = createSlice({
    name: 'pl',
    initialState,
    reducers: {
        startNewPL: (state, action) => {
            state.newCI = getPLDefaultValues();
        },
        setCurrentCI: (state, action) => {
            state.currentCI = action.payload;
        },
        submitPLDetails: (state, action) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state.newPL[key] = value;
            }
        },
        // submitTableInfo: (state, action) => {
        //     state.activeStep += 1;
        //     for (const [key, value] of Object.entries(action.payload)) {
        //         state.newCI[key] = value;
        //     }
        // },
        // prevStep: (state, action) => {
        //     if (state.activeStep > 0) {
        //         state.activeStep -= 1;
        //     }
        // }
    },
    extraReducers: {
        [fetchPLOptions.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchPLOptions.fulfilled]: (state, action) => {
            state.autocomplete = action.payload;
            state.status = 'IDLE';
        },
        [fetchPLOptions.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        // [submitCIForPreview.pending]: (state, action) => {
        //     state.status = 'PENDING';
        // },
        // [submitCIForPreview.fulfilled]: (state, action) => {
        //     state.status = 'IDLE';
        //     state.previewFileURL = action.payload;
        // },
        // [submitCIForPreview.rejected]: (state, action) => {
        //     state.status = 'REJECTED';
        //     state.error = action.error.message;
        // },
        // [submitCI.pending]: (state, action) => {
        //     state.status = 'PENDING';
        // },
        // [submitCI.fulfilled]: (state, action) => {
        //     state.status = 'IDLE';
        // },
        // [submitCI.rejected]: (state, action) => {
        //     state.status = 'REJECTED';
        //     state.error = action.error.message;
        // },
    }
});

export const { startNewPL, setCurrentCI, submitPLDetails } = packingListSlice.actions;

export default packingListSlice.reducer;