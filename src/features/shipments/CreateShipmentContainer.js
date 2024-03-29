import React, { useEffect, useRef } from 'react';
import CreateShipment from './CreateShipment.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectHomeDataStatus, selectHomeError } from 'features/home/duck/home/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import Loader from '../shared/components/Loader.js';
import { fetchClients } from '../clients/duck/thunks.js';
import { selectClientDataStatus, selectClientError } from '../clients/duck/selectors.js';
import { selectOrderDataStatus, selectOrderError } from '../orders/duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';
import {
    selectCurrentShipmentId,
    selectShipmentDataStatus,
    selectShipmentError,
    selectShipmentStatus
} from './duck/selectors.js';
import { Redirect } from 'react-router-dom';
import { fetchShipments } from './duck/thunks.js';
import { cleanHomeState } from 'features/home/duck/home/slice.js';
import { cleanClientState } from '../clients/duck/slice.js';
import { cleanOrderState } from '../orders/duck/slice.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import { fetchCurrentCompany } from 'features/home/duck/home/thunks.js';
import { CREATE_ANY, CREATE_OWN } from '../admin/utils/actions.js';
import ShipmentPermission from '../shared/permissions/ShipmentPermission.js';
import StatusHandler from 'features/shared/status/StatusHandler.js';
import { resetShipmentStatus } from 'features/shipments/duck/slice.js';

const CreateShipmentContainer = React.memo(function CreateShipmentContainer() {
    const dispatch = useDispatch();

    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);
    const orderDataStatus = useSelector(selectOrderDataStatus);
    const orderError = useSelector(selectOrderError);
    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);

    const status = determineStatus(homeDataStatus, clientDataStatus, orderDataStatus, shipmentDataStatus);
    const errors = getErrors(homeError, clientError, orderError, shipmentError);

    const currentShipmentId = useSelector(selectCurrentShipmentId);

    const shipmentStatus = useSelector(selectShipmentStatus);

    useEffect(() => {
        if (shipmentStatus === 'FULFILLED') return () => dispatch(resetShipmentStatus());
    }, [dispatch, shipmentStatus]);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            if (shipmentDataStatus === 'IDLE') dispatch(fetchShipments());
            if (clientDataStatus === 'IDLE') dispatch(fetchClients());
            if (orderDataStatus === 'IDLE') dispatch(fetchOrders());
            if (homeDataStatus === 'IDLE') dispatch(fetchCurrentCompany());
            fetched.current = true;
        }
    }, [
        dispatch,
        shipmentDataStatus,
        clientDataStatus,
        orderDataStatus,
        homeDataStatus
    ]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeState());
                dispatch(cleanClientState());
                dispatch(cleanOrderState());
                dispatch(cleanHomeState());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <ShipmentPermission action={ [CREATE_ANY, CREATE_OWN] }>
            <StatusHandler status={ shipmentStatus } error={ shipmentError } showSuccess/>
            { currentShipmentId && <Redirect to={ `/home/shipments/${ currentShipmentId }` }/> }
            { status === 'REJECTED' && <ErrorPage error={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { !currentShipmentId && status === 'FULFILLED' && <CreateShipment/> }
        </ShipmentPermission>
    );
});

export default CreateShipmentContainer;