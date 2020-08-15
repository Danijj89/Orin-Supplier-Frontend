import { createSlice } from '@reduxjs/toolkit';

//TODO Might want to remove these initial states once the app is complete
const initialState = {
    user: JSON.parse(sessionStorage.getItem('user')),
    company: JSON.parse(sessionStorage.getItem('company')),
    defaults: JSON.parse(sessionStorage.getItem('defaults'))
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSessionInfo: (state, action) => {
            const { user, company, defaults } = action.payload
            state.user = user;
            state.company = company;
            state.defaults = defaults;
        }
    }
});

export const selectCurrentUser = state => state.home.user;
export const selectCurrentCompany = state => state.home.company;

export const { setSessionInfo } = homeSlice.actions;

export default homeSlice.reducer;