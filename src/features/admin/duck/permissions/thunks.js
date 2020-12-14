import PermissionService from '../../../api/PermissionService.js';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPermissions = createAsyncThunk('permissions/fetchPermissions',
    async (_, { rejectWithValue }) => {
        try {
            return await PermissionService.fetchPermissions();
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const createPermission = createAsyncThunk('permissions/createPermission',
    async ({ permission }, { rejectWithValue }) => {
        try {
        return await PermissionService.createPermission(permission);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });