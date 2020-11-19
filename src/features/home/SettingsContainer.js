import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyId, selectHomeError, selectHomeStatus } from './duck/selectors.js';
import { determineStatus } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { selectUserDataStatus, selectUserError } from '../users/duck/selectors.js';
import { fetchUsers } from '../users/duck/thunks.js';
import Settings from './Settings.js';

const SettingsContainer = React.memo(function SettingsContainer() {
    const dispatch = useDispatch();
    const homeStatus = useSelector(selectHomeStatus);
    const homeError = useSelector(selectHomeError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);

    const status = determineStatus([homeStatus, userDataStatus]);
    const errors = [homeError, userError];

    const companyId = useSelector(selectCompanyId);

    useEffect(() => {
        if (companyId) dispatch(fetchUsers({ companyId }));
    }, [dispatch, companyId]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <Settings/> }
        </>
    )
});

export default SettingsContainer;