import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectHomeError, selectHomeDataStatus } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { selectUserDataStatus, selectUserError } from '../users/duck/selectors.js';
import { fetchUsers } from '../users/duck/thunks.js';
import Settings from './Settings.js';
import { cleanHomeState } from './duck/slice.js';
import { cleanUserState } from '../users/duck/slice.js';
import { fetchCurrentCompany } from './duck/thunks.js';

const SettingsContainer = React.memo(function SettingsContainer() {
    const dispatch = useDispatch();
    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);

    const status = determineStatus(homeDataStatus, userDataStatus);
    const errors = getErrors(homeError, userError);

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
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <Settings/> }
        </>
    )
});

export default SettingsContainer;