import React, { useEffect, useRef } from 'react';
import CreateShipment from './CreateShipment.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyId, selectHomeDataStatus, selectHomeError } from '../home/duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import Loader from '../shared/components/Loader.js';
import { fetchClients } from '../clients/duck/thunks.js';
import { selectClientDataStatus, selectClientError } from '../clients/duck/selectors.js';
import { selectOrderDataStatus, selectOrderError } from '../orders/duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';
import { selectCurrentShipmentId } from './duck/selectors.js';
import { Redirect } from 'react-router-dom';
import { fetchShipments } from './duck/thunks.js';
import { cleanHomeState } from '../home/duck/slice.js';
import { cleanClientState } from '../clients/duck/slice.js';
import { cleanOrderState } from '../orders/duck/slice.js';
import { cleanNewShipment } from './duck/slice.js';
import ErrorPage from '../shared/components/ErrorPage.js';

export default function CreateShipmentContainer() {
    const dispatch = useDispatch();

    const homeStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);
    const orderDataStatus = useSelector(selectOrderDataStatus);
    const orderError = useSelector(selectOrderError);

    const status = determineStatus(homeStatus, clientDataStatus, orderDataStatus);
    const errors = getErrors(homeError, clientError, orderError);

    const companyId = useSelector(selectCompanyId);
    const currentShipmentId = useSelector(selectCurrentShipmentId);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current && companyId) {
            dispatch(fetchShipments({ companyId }));
            dispatch(fetchClients({ companyId }));
            dispatch(fetchOrders({ companyId }));
            fetched.current = true;
        }
    }, [companyId, dispatch]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeState());
                dispatch(cleanClientState());
                dispatch(cleanOrderState());
            }
            dispatch(cleanNewShipment());
        }
    }, [dispatch, errors.length]);

    return (
        <>
            { currentShipmentId && <Redirect to={ `/home/shipments/${ currentShipmentId }` }/> }
            { status === 'REJECTED' && <ErrorPage errors={errors} />}
            { status === 'PENDING' && <Loader/> }
            { !currentShipmentId && status === 'FULFILLED' && <CreateShipment /> }
        </>
    )
}