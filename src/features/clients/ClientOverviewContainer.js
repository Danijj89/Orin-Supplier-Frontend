import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectClientDataStatus, selectClientError } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { selectCompanyId, selectHomeError, selectHomeDataStatus } from '../home/duck/selectors.js';
import { fetchClients } from './duck/thunks.js';
import { selectUserDataStatus, selectUserError } from '../users/duck/selectors.js';
import { fetchUsers } from '../users/duck/thunks.js';
import ClientOverview from './ClientOverview.js';
import { cleanHomeState } from '../home/duck/slice.js';
import { cleanUserState } from '../users/duck/slice.js';
import { cleanClientState } from './duck/slice.js';

const ClientOverviewContainer = React.memo(function ClientOverviewContainer() {
    const dispatch = useDispatch();
    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);
    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);

    const status = determineStatus(
        clientDataStatus,
        homeDataStatus,
        userDataStatus
    );
    const errors = getErrors(clientError, homeError, userError);

    const companyId = useSelector(selectCompanyId);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current && companyId) {
            if (clientDataStatus === 'IDLE') dispatch(fetchClients({ companyId }));
            dispatch(fetchUsers({ companyId }));
            fetched.current = true;
        }
    }, [dispatch, clientDataStatus, companyId]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeState());
                dispatch(cleanUserState());
                dispatch(cleanClientState());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <ClientOverview/> }
        </>
    );
});

export default ClientOverviewContainer;