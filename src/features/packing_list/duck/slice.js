import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { LANGUAGE } from '../../../constants.js';
import { fetchPLOptions, submitPL, submitPLForPreview } from './thunks.js';

export const defaultRowValues = ['', '', '', '', 0, 'PCS', 0, 'CTN', 0, 0, 0];

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
    measurementUnit: 'CBM',
    weightUnit: 'KGS',
    createdBy: null,
    fileName: null,
    headers: LANGUAGE.packingList.createPLProductTable.defaultHeaders,
    items: [],
    totalQ: null,
    totalP: { 'CTN': 0 },
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
            state.newPL = getPLDefaultValues();
        },
        setCurrentCI: (state, action) => {
            state.currentCI = action.payload;
        },
        submitPLDetails: (state, action) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state.newPL[key] = value;
            }
        },
        submitPLTableInfo: (state, action) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state.newPL[key] = value;
            }
        }
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
        [submitPLForPreview.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [submitPLForPreview.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            state.previewFileURL = action.payload;
        },
        [submitPLForPreview.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [submitPL.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [submitPL.fulfilled]: (state, action) => {
            state.status = 'IDLE';
        },
        [submitPL.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
    }
});

export const { startNewPL, setCurrentCI, submitPLDetails, submitPLTableInfo } = packingListSlice.actions;

export default packingListSlice.reducer;