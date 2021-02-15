import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from 'features/api/UserService.js';
import { authing } from 'app/utils/authing.js';
import { EmailScene } from 'authing-js-sdk';

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

export const updateUserStatus = createAsyncThunk('users/inactivateUser',
    async ({ userId, update }, { rejectWithValue }) => {
        try {
            await UserService.updateUserStatus(userId, update);
            return { userId, update };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const sendResetCode = createAsyncThunk('users/sendResetCode',
    async ({ userId }, { rejectWithValue, getState }) => {
        const email = getState().app.user.email;
        try {
            return await authing.sendEmail(email, EmailScene.ResetPassword);
        } catch (err) {
            return rejectWithValue(err);
        }
    });

export const resetPassword = createAsyncThunk('users/resetPassword',
    async ({ data }, { rejectWithValue, getState }) => {
        const { code, newPassword } = data;
        const email = getState().app.user.email;
        try {
            return await authing.resetPasswordByEmailCode(email, code, newPassword);
        } catch (err) {
            return rejectWithValue(err);
        }
    });