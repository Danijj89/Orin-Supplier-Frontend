import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../api/UserService.js';

export const updateUser = createAsyncThunk('users/updateUser',
    async ({ userId, update }, { rejectWithValue }) => {
        try {
            return await UserService.updateUser(userId, update);
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

export const fetchUsers = createAsyncThunk('users/fetchUsers',
    async ({ companyId }, { rejectWithValue }) => {
        try {
            return await UserService.fetchUsers(companyId);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });