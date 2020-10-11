import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../features/api/UserService.js';
import CompanyService from '../../features/api/CompanyService.js';
import AppService from '../../features/api/AppService.js';
import { setUsers } from '../../features/users/duck/slice.js';
import { SESSION_USER_ID } from '../sessionKeys.js';

export const signIn = createAsyncThunk('app/signIn',
    async (credentials, { rejectWithValue }) => {
        try {
            return await AppService.signIn(credentials);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const fetchSessionInfo = createAsyncThunk('app/fetchAppData',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const userId = JSON.parse(sessionStorage.getItem(SESSION_USER_ID));
            console.log(userId)
            const { users, ...rest } = await AppService.fetchSessionInfo(userId);
            dispatch(setUsers(users));
            return rest;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })

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

export const updateCompany = createAsyncThunk('home/updateCompany',
    async ({ id, ...update }, { rejectWithValue }) => {
        try {
            return await CompanyService.updateCompany(id, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });