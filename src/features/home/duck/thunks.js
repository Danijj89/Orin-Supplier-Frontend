import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../api/UserService.js';

export const updateCurrentUser = createAsyncThunk('home/updateCurrentUser',
    async (data, { rejectWithValue }) => {
        const { id, ...update } = data;
        try {
            return await UserService.updateUser(id, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });