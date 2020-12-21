import { createSelector } from '@reduxjs/toolkit';

export const selectDashboardDataStatus = (state) => state.home.dataStatus;
export const selectDashboardStatus = (state) => state.home.status;
export const selectDashboardError = (state) => state.home.error;
