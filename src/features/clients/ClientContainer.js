import React, { useEffect, useMemo, useRef } from 'react';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectClientById, selectClientDataStatus, selectClientError } from './duck/selectors.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { selectUserDataStatus, selectUserError } from '../users/duck/selectors.js';
import { selectCompanyId } from '../home/duck/selectors.js';
import { fetchClients } from './duck/thunks.js';
import { fetchUsers } from '../users/duck/thunks.js';
import Client from './Client.js';
import { Redirect, useParams } from 'react-router-dom';
import { cleanHomeState } from '../home/duck/slice.js';
import { cleanUserState } from '../users/duck/slice.js';
import { cleanClientState } from './duck/slice.js';
import { selectOrderDataStatus, selectOrderError } from '../orders/duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';
import { cleanOrderState } from '../orders/duck/slice.js';

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

    const companyId = useSelector(selectCompanyId);
    const client = useSelector(state => selectClientById(state, { clientId }));
    const isClientInactive = useMemo(() => client?.active === false || (!client && clientDataStatus === 'FULFILLED'), [client]);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current && companyId) {
            if (clientDataStatus === 'IDLE') dispatch(fetchClients({ companyId }));
            dispatch(fetchUsers({ companyId }));
            dispatch(fetchOrders({ companyId }));
            fetched.current = true;
        }
    }, [dispatch, clientDataStatus, companyId]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeState());
                dispatch(cleanUserState());
                dispatch(cleanClientState());
                dispatch(cleanOrderState());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <>
            { isClientInactive && <Redirect to={ '/home/clients' }/> }
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { !isClientInactive && status === 'FULFILLED' && <Client/> }
        </>
    )
});

export default ClientContainer;