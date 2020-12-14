import { createAsyncThunk } from '@reduxjs/toolkit';
import RoleService from '../../../api/RoleService.js';

export const fetchRoles = createAsyncThunk('roles/fetchRoles',
    async (_, { rejectWithValue }) => {
        try {
            return await RoleService.fetchRoles();
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const createRole = createAsyncThunk('roles/createRole',
    async ({ role }, { rejectWithValue }) => {
        try {
            return await RoleService.createRole(role);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });