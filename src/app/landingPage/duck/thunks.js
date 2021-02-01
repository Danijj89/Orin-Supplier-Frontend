import { createAsyncThunk } from '@reduxjs/toolkit';
import LandingPageService from "features/api/LandingPageService.js";

export const sendContactInfo = createAsyncThunk(
    'app/contact',
    async ({contact}, { rejectWithValue }) => {
        try {
            return await LandingPageService.sendContactInfo(contact);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
