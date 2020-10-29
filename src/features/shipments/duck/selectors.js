import { shipmentsAdapter } from './slice.js';

export const selectShipmentStatus = state => state.shipments.status;
export const selectShipmentDataStatus = state => state.shipments.dataStatus;
export const selectShipmentError = state => state.shipments.error;

export const {
    selectAll: selectAllShipments,
    selectById: selectShipmentById
} = shipmentsAdapter.getSelectors(state => state.shipments);