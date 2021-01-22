import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectShipmentDataStatus,
    selectShipmentError, selectShipmentStatus
} from './duck/selectors.js';
import { fetchShipments } from './duck/thunks.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import Loader from '../shared/components/Loader.js';
import EditShipment from './EditShipment.js';
import {
    selectClientDataStatus,
    selectClientError
} from '../clients/duck/selectors.js';
import { fetchClients } from '../clients/duck/thunks.js';
import { selectHomeError, selectHomeDataStatus } from 'features/home/duck/home/selectors.js';
import { selectProductDataStatus } from '../products/duck/selectors.js';
import { fetchProducts } from '../products/duck/thunks.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import { selectOrderDataStatus, selectOrderError } from '../orders/duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';
import { cleanHomeState } from 'features/home/duck/home/slice.js';
import { cleanClientState } from '../clients/duck/slice.js';
import { cleanProductState } from '../products/duck/slice.js';
import { cleanShipmentState } from './duck/slice.js';
import { cleanOrderState } from '../orders/duck/slice.js';
import { fetchCurrentCompany } from 'features/home/duck/home/thunks.js';
import { UPDATE_ANY, UPDATE_OWN } from '../admin/utils/actions.js';
import { useParams } from 'react-router-dom';
import ShipmentPermission from '../shared/permissions/ShipmentPermission.js';
import StatusHandler from 'features/shared/status/StatusHandler.js';
import { resetShipmentStatus } from 'features/shipments/duck/slice.js';

const EditShipmentContainer = React.memo(function EditShipmentContainer() {
    const dispatch = useDispatch();
    const { id: shipmentId } = useParams();

    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);
    const productDataStatus = useSelector(selectProductDataStatus);
    const productError = useSelector(selectClientError);
    const orderDataStatus = useSelector(selectOrderDataStatus);
    const orderError = useSelector(selectOrderError);

    const status = determineStatus(
        homeDataStatus,
        productDataStatus,
        shipmentDataStatus,
        clientDataStatus,
        orderDataStatus
    );
    const errors = getErrors(homeError, shipmentError, clientError, productError, orderError);

    const shipmentStatus = useSelector(selectShipmentStatus);

    useEffect(() => {
        return () => {
            if (shipmentStatus === 'FULFILLED') dispatch(resetShipmentStatus());
        }
    }, [dispatch, shipmentStatus]);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            if (shipmentDataStatus === 'IDLE') dispatch(fetchShipments());
            if (clientDataStatus === 'IDLE') dispatch(fetchClients());
            if (productDataStatus === 'IDLE') dispatch(fetchProducts());
            if (orderDataStatus === 'IDLE') dispatch(fetchOrders());
            if (homeDataStatus === 'IDLE') dispatch(fetchCurrentCompany());
            fetched.current = true;
        }
    }, [
        dispatch,
        shipmentDataStatus,
        clientDataStatus,
        productDataStatus,
        orderDataStatus,
        homeDataStatus
    ]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeState());
                dispatch(cleanClientState());
                dispatch(cleanProductState());
                dispatch(cleanShipmentState());
                dispatch(cleanOrderState());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <ShipmentPermission action={ [UPDATE_ANY, UPDATE_OWN] } shipmentId={ shipmentId }>
            <StatusHandler status={ shipmentStatus } error={ shipmentError } showSuccess/>
            { status === 'REJECTED' && <ErrorPage error={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <EditShipment/> }
        </ShipmentPermission>
    );
});

export default EditShipmentContainer;