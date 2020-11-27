import { usersAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectEntities: selectUsersMap
} = usersAdapter.getSelectors(state => state.users);

export const selectUserStatus = state => state.users.status;
export const selectUserDataStatus = state => state.users.dataStatus;
export const selectUserError = state => state.users.error;
export const selectAllActiveUsers = createSelector(
    selectAllUsers,
    users => users.filter(user => user.active)
);

export const selectUserOptions = createSelector(
    selectAllActiveUsers,
    selectUserById,
    (users, user) => {
        if (user && !user.active) users.push(user);
        return users;
    }
);