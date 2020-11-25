import React, { useEffect, useRef } from 'react';
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
import { cleanHomeError } from '../home/duck/slice.js';
import { cleanUserError } from '../users/duck/slice.js';
import { cleanClientError } from './duck/slice.js';

const ClientContainer = React.memo(function ClientContainer() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);

    const status = determineStatus(clientDataStatus, userDataStatus);
    const errors = getErrors(clientError, userError);

    const companyId = useSelector(selectCompanyId);
    const client = useSelector(state => selectClientById(state, id));

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
                dispatch(cleanHomeError());
                dispatch(cleanUserError());
                dispatch(cleanClientError());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <>
            { client?.active === false && <Redirect to={ '/home/clients' }/> }
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <Client />}
        </>
    )
});

export default ClientContainer;