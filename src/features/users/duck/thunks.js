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

export const fetchUsers = createAsyncThunk('users/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            return await UserService.fetchUsers();
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });