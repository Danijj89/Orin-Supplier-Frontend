import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectHomeError, selectHomeDataStatus } from 'features/home/duck/home/selectors.js';
import { selectShipmentDataStatus, selectShipmentError } from '../shipments/duck/selectors.js';
import { selectClientDataStatus, selectClientError } from '../clients/duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import { cleanNewDocument } from './duck/slice.js';
import { fetchShipments } from '../shipments/duck/thunks.js';
import { fetchClients } from '../clients/duck/thunks.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import SalesContract from './SalesContract.js';
import { cleanHomeState } from 'features/home/duck/home/slice.js';
import { cleanClientState } from '../clients/duck/slice.js';
import { cleanShipmentState } from '../shipments/duck/slice.js';
import { CREATE_ANY, CREATE_OWN } from '../admin/utils/actions.js';
import { fetchCurrentCompany } from 'features/home/duck/home/thunks.js';
import ShipmentPermission from '../shared/permissions/ShipmentPermission.js';
import { selectOrderDataStatus, selectOrderError } from 'features/orders/duck/selectors.js';
import { fetchOrders } from 'features/orders/duck/thunks.js';
import { cleanOrderState } from 'features/orders/duck/slice.js';

const SalesContractContainer = React.memo(function SalesContractContainer() {
    const dispatch = useDispatch();

    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);
    const orderDataStatus = useSelector(selectOrderDataStatus);
    const orderError = useSelector(selectOrderError);

    const status = determineStatus(homeDataStatus, shipmentDataStatus, clientDataStatus, orderDataStatus);
    const errors = getErrors(homeError, shipmentError, clientError, orderError);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            if (shipmentDataStatus === 'IDLE') dispatch(fetchShipments());
            if (clientDataStatus === 'IDLE') dispatch(fetchClients());
            if (homeDataStatus === 'IDLE') dispatch(fetchCurrentCompany());
            if (orderDataStatus === 'IDLE') dispatch(fetchOrders());
            fetched.current = true;
        }
    }, [dispatch, shipmentDataStatus, clientDataStatus, homeDataStatus, orderDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeState());
                dispatch(cleanShipmentState());
                dispatch(cleanClientState());
                dispatch(cleanOrderState());
            }
            dispatch(cleanNewDocument());
        }
    }, [dispatch, errors.length]);

    return (
        <ShipmentPermission action={ [CREATE_ANY, CREATE_OWN] }>
            { status === 'REJECTED' && <ErrorPage error={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <SalesContract/> }
        </ShipmentPermission>
    );
});

export default SalesContractContainer;