import { usersAdapter } from './slice.js';

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById
} = usersAdapter.getSelectors(state => state.users);

export const selectUserStatus = state => state.users.status;