import { ordersAdapter } from '../../../orders/duck/slice.js';


export const {
    selectAll
} = ordersAdapter.getSelectors(state => state.roles);

export const selectRoleDataStatus = state => state.roles.dataStatus;
export const selectRoleStatus = state => state.roles.status;
export const selectRoleError = state => state.roles.error;

