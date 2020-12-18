import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectClientDataStatus, selectClientError } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { fetchClients } from './duck/thunks.js';
import { selectUserDataStatus, selectUserError } from '../users/duck/selectors.js';
import { fetchUsers } from '../users/duck/thunks.js';
import ClientOverview from './ClientOverview.js';
import { cleanUserState } from '../users/duck/slice.js';
import { cleanClientState } from './duck/slice.js';
import Permission from '../shared/components/Permission.js';
import { CLIENT } from '../admin/utils/resources.js';
import { READ_ANY, READ_OWN } from '../admin/utils/actions.js';

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
        <Permission resource={CLIENT} action={[READ_ANY, READ_OWN]}>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <ClientOverview/> }
        </Permission>
    );
});

export default ClientOverviewContainer;