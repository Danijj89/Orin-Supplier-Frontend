import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';


export const rolesAdapter = createEntityAdapter({
    selectId: role => role._id,
    sortComparer: (a, b) => b.name.localeCompare(a.name)
});

const initialState = rolesAdapter.getInitialState({
    dataStatus: 'IDLE',
    status: 'IDLE',
    error: null
});

const slice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: {}
});

export default slice.reducer;