import { createAsyncThunk } from '@reduxjs/toolkit';
import AppService from '../../features/api/AppService.js';
import { AuthenticationClient } from 'authing-js-sdk';

export const signIn = createAsyncThunk('app/signIn',
    async ({ email, password }, { rejectWithValue }) => {
        let user;
        try {
            const authing = new AuthenticationClient({
                appId: process.env.NODE_ENV
                    ? process.env.REACT_APP_DEV_AUTHING_APP_ID
                    : process.env.REACT_APP_DEV_AUTHING_APP_ID,
                appDomain: process.env.REACT_APP_DEV_AUTHING_APP_DOMAIN,
                onError: (code, message, data) => console.log(message)
            });
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