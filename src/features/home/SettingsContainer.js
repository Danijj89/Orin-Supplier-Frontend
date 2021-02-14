import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectHomeError, selectHomeDataStatus, selectHomeStatus } from 'features/home/duck/home/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { selectUserDataStatus, selectUserError, selectUserStatus } from 'features/home/duck/users/selectors.js';
import { fetchUsers } from 'features/home/duck/users/thunks.js';
import Settings from './Settings.js';
import { cleanHomeState, resetHomeStatus } from 'features/home/duck/home/slice.js';
import { cleanUserState, resetUserStatus } from 'features/home/duck/users/slice.js';
import { fetchCurrentCompany } from 'features/home/duck/home/thunks.js';
import StatusHandler from 'features/shared/status/StatusHandler.js';
import { selectRoleDataStatus, selectRoleError } from 'features/admin/duck/roles/selectors.js';
import { fetchRoles } from 'features/admin/duck/roles/thunks.js';
import { cleanRoleState } from 'features/admin/duck/roles/slice.js';

const SettingsContainer = React.memo(function SettingsContainer() {
    const dispatch = useDispatch();

    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);
    const roleDataStatus = useSelector(selectRoleDataStatus);
    const roleError = useSelector(selectRoleError);

    const status = determineStatus(homeDataStatus, userDataStatus, roleDataStatus);
    const errors = getErrors(homeError, userError, roleError);

    const userStatus = useSelector(selectUserStatus);
    const homeStatus = useSelector(selectHomeStatus);

    useEffect(() => {
        return () => {
            if (userStatus === 'FULFILLED') dispatch(resetUserStatus());
            if (homeStatus === 'FULFILLED') dispatch(resetHomeStatus());
        }
    }, [dispatch, userStatus, homeStatus]);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            if (homeDataStatus === 'IDLE') dispatch(fetchCurrentCompany());
            if (userDataStatus === 'IDLE') dispatch(fetchUsers());
            if (roleDataStatus === 'IDLE') dispatch(fetchRoles());
            fetched.current = true;
        }
    }, [dispatch, homeDataStatus, userDataStatus, roleDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeState());
                dispatch(cleanUserState());
                dispatch(cleanRoleState());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <>
            <StatusHandler status={ userStatus } error={ userError } showSuccess/>
            <StatusHandler status={ homeStatus } error={ homeError } showSuccess/>
            { status === 'REJECTED' && <ErrorPage error={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <Settings/> }
        </>
    )
});

export default SettingsContainer;