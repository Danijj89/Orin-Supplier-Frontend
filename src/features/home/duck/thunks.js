import { createAsyncThunk } from '@reduxjs/toolkit';
import { SESSION_USER_ID } from '../../../app/sessionKeys.js';
import AppService from '../../api/AppService.js';
import { setUsers } from '../../users/duck/slice.js';
import CompanyService from '../../api/CompanyService.js';

export const fetchSessionInfo = createAsyncThunk('home/fetchAppData',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const userId = JSON.parse(sessionStorage.getItem(SESSION_USER_ID));
            const { users, company } = await AppService.fetchSessionInfo(userId);
            dispatch(setUsers(users));
            return company;
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
    async ({ companyId, addressId, update }, { rejectWithValue }) => {
        try {
            return await CompanyService.updateAddress(companyId, addressId, update);
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

export const createCompanyBankDetail = createAsyncThunk('home/createCompanyBankDetail',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            return await CompanyService.createCompanyBankDetail(id, data);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const deleteCompanyBankDetail = createAsyncThunk('home/deleteCompanyBankDetail',
    async ({ companyId, bankDetailId }, { rejectWithValue }) => {
        try {
            return await CompanyService.deleteCompanyBankDetail(companyId, bankDetailId);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateCompanyBankDetail = createAsyncThunk('home/updateCompanyBankDetail',
    async ({ companyId, bankDetailId, update }, { rejectWithValue }) => {
        try {
            return await CompanyService.updateCompanyBankDetail(companyId, bankDetailId, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

