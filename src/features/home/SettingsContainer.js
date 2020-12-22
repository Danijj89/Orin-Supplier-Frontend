import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectHomeError, selectHomeDataStatus, selectHomeStatus } from 'features/home/duck/home/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { selectUserDataStatus, selectUserError, selectUserStatus } from 'features/home/duck/users/selectors.js';
import { fetchUsers } from 'features/home/duck/users/thunks.js';
import Settings from './Settings.js';
import { cleanHomeState } from 'features/home/duck/home/slice.js';
import { cleanUserState } from 'features/home/duck/users/slice.js';
import { fetchCurrentCompany } from 'features/home/duck/home/thunks.js';
import StatusHandler from 'features/shared/status/StatusHandler.js';

const SettingsContainer = React.memo(function SettingsContainer() {
    const dispatch = useDispatch();

    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);

    const status = determineStatus(homeDataStatus, userDataStatus);
    const errors = getErrors(homeError, userError);

    const userStatus = useSelector(selectUserStatus);
    const homeStatus = useSelector(selectHomeStatus);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            if (homeDataStatus === 'IDLE') dispatch(fetchCurrentCompany());
            if (userDataStatus === 'IDLE') dispatch(fetchUsers());
            fetched.current = true;
        }
    }, [dispatch, homeDataStatus, userDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeState());
                dispatch(cleanUserState());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <>
            <StatusHandler status={ userStatus } error={ userError }/>
            <StatusHandler status={ homeStatus } error={ homeError }/>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <Settings/> }
        </>
    )
});

export default SettingsContainer;