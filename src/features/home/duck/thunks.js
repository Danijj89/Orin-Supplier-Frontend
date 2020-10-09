import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../api/UserService.js';
import CompanyService from '../../api/CompanyService.js';

export const updateCurrentUser = createAsyncThunk('home/updateCurrentUser',
    async (data, { rejectWithValue }) => {
        const { id, ...update } = data;
        try {
            return await UserService.updateUser(id, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const resetPassword = createAsyncThunk('home/resetPassword',
    async (data, { rejectWithValue }) => {
        const { id, ...rest } = data;
        try {
            return await UserService.resetPassword(id, rest);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const addNewAddress = createAsyncThunk('home/addNewAddress',
    async (data, { rejectWithValue }) => {
        const { companyId, ...address } = data;
        try {
            return await CompanyService.addNewAddress(companyId, address);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const deleteAddress = createAsyncThunk('home/deleteAddress',
    async ({ companyId, addressId }, { rejectWithValue }) => {
        try {
            await CompanyService.deleteAddress(companyId, addressId);
            return addressId;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateAddress = createAsyncThunk('home/updateAddress',
    async ({ companyId, ...update }, { rejectWithValue }) => {
        try {
            await CompanyService.updateAddress(companyId, update._id, update);
            return update;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateDefaultAddress = createAsyncThunk('home/updateDefaultAddress',
    async ({ companyId, addressId }, { rejectWithValue }) => {
        try {
            await CompanyService.updateDefaultAddress(companyId, addressId);
            return addressId;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const fetchUsersByCompanyId = createAsyncThunk('home/fetchUsersByCompanyId',
    async (id, { rejectWithValue }) => {
        try {
            return await UserService.fetchUsersByCompanyId(id);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const fetchAutocompleteOptions = createAsyncThunk('home/fetchAutocompleteOptions',
    async (companyId, { rejectWithValue }) => {
        try {
            return await CompanyService.fetchAutocompleteOptions(companyId);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateCompany = createAsyncThunk('home/updateCompany',
    async ({ id, ...update }, { rejectWithValue }) => {
        try {
            return await CompanyService.updateCompany(id, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });