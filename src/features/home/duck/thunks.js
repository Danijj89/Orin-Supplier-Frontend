import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../api/UserService.js';
import CompanyService from '../../api/CompanyService.js';

export const updateCurrentUser = createAsyncThunk('home/updateCurrentUser',
    async (data) => {
        const { id, ...update } = data;
        return await UserService.updateUser(id, update);
    });

export const resetPassword = createAsyncThunk('home/resetPassword',
    async (data) => {
        const { id, ...rest } = data;
        return await UserService.resetPassword(id, rest);
    });

export const addNewAddress = createAsyncThunk('home/addNewAddress',
    async (data) => {
        const { id, ...address } = data;
        await CompanyService.addNewAddress(id, address);
        return address;
    });