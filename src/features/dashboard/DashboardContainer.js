import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './Dashboard.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import {
    selectDashboardDataStatus,
    selectDashboardError,
} from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import { cleanDashboardState } from './duck/slice.js';
import { fetchDashboardData } from './duck/thunks.js';

const DashboardContainer = React.memo(function HomeContainer() {
    const dispatch = useDispatch();
    const dashboardDataStatus = useSelector(selectDashboardDataStatus);
    const dashboardError = useSelector(selectDashboardError);

    const status = determineStatus(dashboardDataStatus);
    const errors = getErrors(dashboardError);

    const fetched = useRef(false);

    useEffect(() => {
        if (!fetched.current) {
            if (dashboardDataStatus === 'IDLE') dispatch(fetchDashboardData());
            fetched.current = true;
        }
    }, [dispatch, dashboardDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanDashboardState());
            }
        };
    }, [dispatch, errors.length]);

    return (
        <>
            {status === 'REJECTED' && <ErrorPage errors={errors} />}
            {status === 'PENDING' && <Loader />}
            {status === 'FULFILLED' && <Dashboard />}
        </>
    );
});

export default DashboardContainer;
