import { createSelector } from '@reduxjs/toolkit';

export const selectDashboardDataStatus = (state) => state.dashboard.dataStatus;
export const selectDashboardStatus = (state) => state.dashboard.status;
export const selectDashboardError = (state) => state.dashboard.error;
export const selectNewOrders = (state) =>
    state.dashboard.dashboardData.newOrders;
export const selectInProdOrders = (state) =>
    state.dashboard.dashboardData.inProd;
export const selectInQAOrders = (state) => state.dashboard.dashboardData.inQA;
export const selectWithException = (state) =>
    state.dashboard.dashboardData.withException;
export const selectInProcOrders = (state) =>
    state.dashboard.dashboardData.inProc;
export const selectOrderCountData = (state) =>
    state.dashboard.dashboardData.newOrdersByDay;
export const selectOrderRevData = (state) =>
    state.dashboard.dashboardData.revenueByDay;
