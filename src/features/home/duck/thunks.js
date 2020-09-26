import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../api/UserService.js';

export const updateCurrentUser = createAsyncThunk('home/updateCurrentUser',
     async (data) => {
        const { id, ...update } = data;
        return await UserService.updateUser(id, update);
    });
