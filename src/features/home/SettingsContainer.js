import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyId, selectHomeError, selectHomeDataStatus } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { selectUserDataStatus, selectUserError } from '../users/duck/selectors.js';
import { fetchUsers } from '../users/duck/thunks.js';
import Settings from './Settings.js';
import { cleanHomeState } from './duck/slice.js';
import { cleanUserState } from '../users/duck/slice.js';

const SettingsContainer = React.memo(function SettingsContainer() {
    const dispatch = useDispatch();
    const homeStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);

    const status = determineStatus(homeStatus, userDataStatus);
    const errors = getErrors(homeError, userError);

    const companyId = useSelector(selectCompanyId);

    useEffect(() => {
        if (userDataStatus === 'IDLE' && companyId)
            dispatch(fetchUsers({ companyId }));
    }, [dispatch, companyId, userDataStatus]);

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