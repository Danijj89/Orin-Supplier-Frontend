import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from 'features/api/UserService.js';

export const createUser = createAsyncThunk('users/createUser',
    async ({ data }, { rejectWithValue }) => {
        try {
            return await UserService.createUser(data);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

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

export const inactivateUser = createAsyncThunk('users/inactivateUser',
    async ({ userId }, { rejectWithValue }) => {
        try {
            await UserService.inactivateUser(userId);
            return { userId };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });