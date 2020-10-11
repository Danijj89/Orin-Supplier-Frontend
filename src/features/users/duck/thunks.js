import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../api/UserService.js';

export const fetchUsers = createAsyncThunk('users/fetchUsers',
    async (id, { rejectWithValue }) => {
        try {
            return await UserService.fetchUsers(id);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });