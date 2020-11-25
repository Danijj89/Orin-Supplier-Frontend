import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyId, selectHomeError, selectHomeDataStatus } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { selectUserDataStatus, selectUserError } from '../users/duck/selectors.js';
import { fetchUsers } from '../users/duck/thunks.js';
import Settings from './Settings.js';
import { cleanHomeError } from './duck/slice.js';
import { cleanUserError } from '../users/duck/slice.js';

const SettingsContainer = React.memo(function SettingsContainer() {
    const dispatch = useDispatch();
    const homeStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);

    const status = determineStatus([homeStatus, userDataStatus]);
    const errors = getErrors(homeError, userError);

    const companyId = useSelector(selectCompanyId);

    useEffect(() => {
        if (companyId) dispatch(fetchUsers({ companyId }));
    }, [dispatch, companyId]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeError());
                dispatch(cleanUserError());
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