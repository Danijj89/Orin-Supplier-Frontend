import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { LANGUAGE } from '../../../constants.js';
import { fetchAllOrderOptions, fetchOrders, submitOrder, submitOrderForPreview } from './thunks.js';
import { onUnitPriceChange, onUnitChange, onQuantityChange } from './helpers.js';

const ordersAdapter = createEntityAdapter({
    selectId: order => order._id,
    sortComparer: (a, b) => b.crd.localeCompare(a.crd)
});

const defaultRowValues = ['', '', '', '', 0, 'PCS', 0, 0];
const getOrderDefaultValues = () => {
    return {
        orderDetails: {
            orderNumber: '',
            orderDate: new Date().toISOString().substr(0, 10),
            from: '',
            fromAddress: '',
            crd: new Date().toISOString().substr(0, 10),
            incoterm: null,
            paymentMethod: null,
            reference: null,
            remarks: null,
            deliveryMethod: 'Ocean',
            portOfLoading: '',
            portOfDestination: '',
            shippingCarrier: '',
            createdBy: null,
            company: null
        },
        orderProductInfo: {
            columns: LANGUAGE.productTable.defaultColumns,
            rows: [defaultRowValues],
            currency: 'USD',
            totalPieces: {'PCS': 0},
            totalAmount: 0
        }
    }
}

const initialState = ordersAdapter.getInitialState({
    status: 'IDLE',
    error: null,
    steps: LANGUAGE.createOrder.steps,
    activeStep: 0,
    autocomplete: {
        deliveryOptions: [],
        currencies: [],
        itemReferences: [],
        productDescriptions: [],
        itemUnits: [],
        customers: [],
        ports: []
    },
    newOrder: getOrderDefaultValues(),
    previewFileURL: null
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        startNewOrder: (state, action) => {
            state.activeStep = 0;
            state.newOrder = getOrderDefaultValues();
        },
        submitOrderDetails: (state, action) => {
            state.newOrder.orderDetails = action.payload;
            state.activeStep += 1;
        },
        prevStep: (state, action) => {
            const {activeStep} = state;
            if (activeStep > 0) {
                state.activeStep -= 1;
            }
        },
        nextStep: (state, action) => {
            const {activeStep} = state;
            if (activeStep < 2) {
                state.activeStep += 1;
            }
        },
        changeCellValue: (state, action) => {
            const { rowIdx, colIdx, val } = action.payload;
            let { rows } = state.newOrder.orderProductInfo;

            if (colIdx === 6) {
                // Unit price has changed, we need to update total amount
                onUnitPriceChange(state, action);
            } else if (colIdx === 5) {
                // Unit changed, need to update total pieces
                onUnitChange(state, action);
            } else if (colIdx === 4) {
                // quantity changed, need to update both total amount and total prices
                onQuantityChange(state, action);
            } else {
                // Can just update field
                rows[rowIdx][colIdx] = val;
            }
        },
        deleteRow: (state, action) => {
            state.newOrder.orderProductInfo.rows.splice(action.payload, 1);
        },
        addRow: (state, action) => {
            state.newOrder.orderProductInfo.rows.push(defaultRowValues);
        },
        addColumn: (state, action) => {
            const idx = state.newOrder.orderProductInfo.columns.length - 4;
            state.newOrder.orderProductInfo.columns.splice(idx, 0, action.payload);
        },
        deleteColumn: (state, action) => {
            state.newOrder.orderProductInfo.columns.splice(action.payload, 1);
        },
        changeCurrency: (state, action) => {
            state.newOrder.orderProductInfo.currency = action.payload;
        }
    },
    extraReducers: {
        [fetchAllOrderOptions.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchAllOrderOptions.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            state.autocomplete = action.payload;
        },
        [fetchAllOrderOptions.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [submitOrderForPreview.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [submitOrderForPreview.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            state.previewFileURL = action.payload;
        },
        [submitOrderForPreview.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [submitOrder.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [submitOrder.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            state.newOrder = getOrderDefaultValues();
            state.activeStep = 0;
        },
        [submitOrder.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [fetchOrders.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchOrders.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            ordersAdapter.setAll(state, action.payload);
        }
    }
});

export const { startNewOrder, submitOrderDetails, prevStep, nextStep, changeCellValue, deleteRow, addRow,
    addColumn, deleteColumn, changeCurrency } = ordersSlice.actions;

export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById
} = ordersAdapter.getSelectors(state => state.orders);

export default ordersSlice.reducer;