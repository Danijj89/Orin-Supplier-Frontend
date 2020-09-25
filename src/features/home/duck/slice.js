import { createSlice } from '@reduxjs/toolkit';

//TODO Might want to remove these initial states once the app is complete
const initialState = {
    user: JSON.parse(sessionStorage.getItem('user')),
    company: JSON.parse(sessionStorage.getItem('company')),
    defaults: JSON.parse(sessionStorage.getItem('defaults')),
    selectedTab: 'orders'
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
        },
        changeSelectedTab: (state, action) => {
            state.selectedTab = action.payload;
        }
    },
});

export const selectCurrentUser = state => state.home.user;
export const selectCurrentCompany = state => state.home.company;
export const selectCurrentDefaults = state => state.home.defaults;
export const selectCurrentTab = state => state.home.selectedTab;

export const { setSessionInfo, changeSelectedTab } = homeSlice.actions;

export default homeSlice.reducer;