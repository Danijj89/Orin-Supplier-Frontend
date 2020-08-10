import { createSlice } from '@reduxjs/toolkit';

//TODO Might want to remove these initial states once the app is complete
const initialState = {
    user: JSON.parse(sessionStorage.getItem('user')),
    company: JSON.parse(sessionStorage.getItem('company'))
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setCurrentUserInfo: (state, action) => {
            let { company, ...userWithoutCompany } = action.payload
            state.user = userWithoutCompany;
            state.company = company;
        }
    }
});

export const selectCurrentUser = state => {
    let { user } = state.home;
    if (!user) user = JSON.parse(sessionStorage.getItem('user'));
    return user;
};
export const selectCurrentCompany = state => state.home.company;

export const { setCurrentUserInfo } = homeSlice.actions;

export default homeSlice.reducer;