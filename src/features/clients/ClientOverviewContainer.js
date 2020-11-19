import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectClientDataStatus, selectClientError } from './duck/selectors.js';
import { determineStatus } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { selectCompanyId, selectHomeError, selectHomeStatus } from '../home/duck/selectors.js';
import { fetchClients } from './duck/thunks.js';
import { selectUserDataStatus, selectUserError } from '../users/duck/selectors.js';
import { fetchUsers } from '../users/duck/thunks.js';
import ClientOverview from './ClientOverview.js';

const ClientOverviewContainer = React.memo(function ClientOverviewContainer() {
    const dispatch = useDispatch();
    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);
    const homeStatus = useSelector(selectHomeStatus);
    const homeError = useSelector(selectHomeError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);

    const status = determineStatus([
        clientDataStatus,
        homeStatus,
        userDataStatus
    ]);
    const errors = [clientError, homeError, userError];

    const companyId = useSelector(selectCompanyId);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current && companyId) {
            if (clientDataStatus === 'IDLE') dispatch(fetchClients({ companyId }));
            dispatch(fetchUsers({ companyId }));
            fetched.current = true;
        }
    }, [dispatch, clientDataStatus, companyId]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <ClientOverview/> }
        </>
    );
});

export default ClientOverviewContainer;