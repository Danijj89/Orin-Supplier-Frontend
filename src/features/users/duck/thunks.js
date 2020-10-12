import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../api/UserService.js';

export const updateUser = createAsyncThunk('users/updateCurrentUser',
    async (data, { rejectWithValue }) => {
        const { id, ...update } = data;
        try {
            return await UserService.updateUser(id, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const resetPassword = createAsyncThunk('users/resetPassword',
    async (data, { rejectWithValue }) => {
        const { id, ...rest } = data;
        try {
            return await UserService.resetPassword(id, rest);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });