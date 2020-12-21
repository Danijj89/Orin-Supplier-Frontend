import { createAsyncThunk } from '@reduxjs/toolkit';
import CompanyService from '../../../api/CompanyService.js';
import UserService from '../../../api/UserService.js';

export const fetchCompanies = createAsyncThunk('companies/fetchCompanies',
    async (_, { rejectWithValue }) => {
        try {
            return await CompanyService.fetchCompanies();
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const createCompany = createAsyncThunk('companies/createCompany',
    async ({ company }, { rejectWithValue }) => {
        try {
            return await CompanyService.createCompany(company);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const createUser = createAsyncThunk('companies/createUser',
    async ({ user }, { rejectWithValue }) => {
        try {
            return await UserService.createUser(user);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateUserRoles = createAsyncThunk('companies/updateUserRoles',
    async ({ companyId, userId, update }, { rejectWithValue }) => {
        try {
            await UserService.updateUserRoles(userId, update);
            return { companyId, userId, update };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });