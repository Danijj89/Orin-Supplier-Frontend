import { createAsyncThunk } from '@reduxjs/toolkit';
import ShipmentService from './services.js';

export const startNewShipment = createAsyncThunk('shipments/startNewShipment',
    async (_, { getState }) => {
        const { _id: userId } = getState().home.user;
        const { _id: companyId } = getState().home.company;
        return await ShipmentService.fetchNewShipmentData(userId, companyId);
    }
)