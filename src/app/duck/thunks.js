import { createAsyncThunk } from '@reduxjs/toolkit';
import AppService from '../../features/api/AppService.js';
import { authing } from 'app/utils/authing.js';

export const signIn = createAsyncThunk('app/signIn',
    async ({ email, password }, { rejectWithValue }) => {
        let user;
        try {
            user = await authing.loginByEmail(email, password);
            try {
                const sessionData = { userId: user.id, token: user.token, tokenExpiredAt: user.tokenExpiredAt };
                return await AppService.signIn(sessionData);
            } catch (err) {
                return rejectWithValue(err.response.data);
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    });

export const signOut = createAsyncThunk('app/signOut',
    async (_, { rejectWithValue }) => {
        try {
            return await authing.logout();
        } catch (err) {
            return rejectWithValue(err);
        }
    });