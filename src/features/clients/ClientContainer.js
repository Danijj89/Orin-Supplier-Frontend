import React, { useEffect, useMemo, useRef } from 'react';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectClientById, selectClientDataStatus, selectClientError, selectClientStatus } from './duck/selectors.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { selectUserDataStatus, selectUserError } from 'features/home/duck/users/selectors.js';
import { fetchClients } from './duck/thunks.js';
import { fetchUsers } from 'features/home/duck/users/thunks.js';
import Client from './Client.js';
import { Redirect, useParams } from 'react-router-dom';
import { cleanUserState } from 'features/home/duck/users/slice.js';
import { cleanClientState } from './duck/slice.js';
import { selectOrderDataStatus, selectOrderError } from '../orders/duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';
import { cleanOrderState } from '../orders/duck/slice.js';
import { READ_ANY, READ_OWN } from '../admin/utils/actions.js';
import ClientPermission from '../shared/permissions/ClientPermission.js';
import StatusHandler from 'features/shared/status/StatusHandler.js';
import { resetClientStatus } from 'features/clients/duck/slice.js';

const ClientContainer = React.memo(function ClientContainer() {
    const dispatch = useDispatch();
    const { id: clientId } = useParams();

    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);
    const orderDataStatus = useSelector(selectOrderDataStatus);
    const orderError = useSelector(selectOrderError);

    const status = determineStatus(clientDataStatus, userDataStatus, orderDataStatus);
    const errors = getErrors(clientError, userError, orderError);

    const clientStatus = useSelector(selectClientStatus);

    const client = useSelector(state => selectClientById(state, { clientId }));
    const isClientInactive = useMemo(
        () => client?.active === false || (!client && clientDataStatus === 'FULFILLED'),
        [client, clientDataStatus]);

    useEffect(() => {
        return () => {
            if (clientStatus === 'FULFILLED') dispatch(resetClientStatus());
        }
    }, [dispatch, clientStatus]);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            if (clientDataStatus === 'IDLE') dispatch(fetchClients());
            if (userDataStatus === 'IDLE') dispatch(fetchUsers());
            if (orderDataStatus === 'IDLE') dispatch(fetchOrders());
            fetched.current = true;
        }
    }, [dispatch, clientDataStatus, userDataStatus, orderDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanUserState());
                dispatch(cleanClientState());
                dispatch(cleanOrderState());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <ClientPermission action={ [READ_ANY, READ_OWN] } clientId={ clientId }>
            <StatusHandler status={ clientStatus } error={ clientError } showSuccess/>
            { isClientInactive && <Redirect to={ '/home/clients' }/> }
            { status === 'REJECTED' && <ErrorPage error={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { !isClientInactive && status === 'FULFILLED' && <Client/> }
        </ClientPermission>
    );
});

export default ClientContainer;