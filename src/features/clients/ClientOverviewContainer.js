import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectClientDataStatus, selectClientError, selectClientStatus } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { fetchClients } from './duck/thunks.js';
import { selectUserDataStatus, selectUserError } from 'features/home/duck/users/selectors.js';
import { fetchUsers } from 'features/home/duck/users/thunks.js';
import ClientOverview from './ClientOverview.js';
import { cleanUserState } from 'features/home/duck/users/slice.js';
import { cleanClientState } from './duck/slice.js';
import { READ_ANY, READ_OWN } from '../admin/utils/actions.js';
import ClientPermission from '../shared/permissions/ClientPermission.js';
import StatusHandler from 'features/shared/status/StatusHandler.js';

const ClientOverviewContainer = React.memo(function ClientOverviewContainer() {
    const dispatch = useDispatch();
    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);

    const status = determineStatus(
        clientDataStatus,
        userDataStatus
    );
    const errors = getErrors(clientError, userError);

    const clientStatus = useSelector(selectClientStatus);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            if (clientDataStatus === 'IDLE') dispatch(fetchClients());
            if (userDataStatus === 'IDLE') dispatch(fetchUsers());
            fetched.current = true;
        }
    }, [dispatch, clientDataStatus, userDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanUserState());
                dispatch(cleanClientState());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <ClientPermission action={ [READ_ANY, READ_OWN] }>
            <StatusHandler status={ clientStatus } error={ clientError }/>
            { status === 'REJECTED' && <ErrorPage error={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <ClientOverview/> }
        </ClientPermission>
    );
});

export default ClientOverviewContainer;