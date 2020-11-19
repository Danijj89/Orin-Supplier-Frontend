import { usersAdapter } from './slice.js';

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectEntities: selectUsersMap
} = usersAdapter.getSelectors(state => state.users);

export const selectUserStatus = state => state.users.status;
export const selectUserDataStatus = state => state.users.dataStatus;
export const selectUserError = state => state.users.error;