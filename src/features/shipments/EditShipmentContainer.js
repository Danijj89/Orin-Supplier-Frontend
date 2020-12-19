import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectShipmentDataStatus,
    selectShipmentError
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
import { selectHomeError, selectHomeDataStatus } from '../home/duck/selectors.js';
import { selectProductDataStatus } from '../products/duck/selectors.js';
import { fetchProducts } from '../products/duck/thunks.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import { selectOrderDataStatus, selectOrderError } from '../orders/duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';
import { cleanHomeState } from '../home/duck/slice.js';
import { cleanClientState } from '../clients/duck/slice.js';
import { cleanProductState } from '../products/duck/slice.js';
import { cleanShipmentState } from './duck/slice.js';
import { cleanOrderState } from '../orders/duck/slice.js';
import { fetchCurrentCompany } from '../home/duck/thunks.js';
import Permission from '../shared/components/Permission.js';
import { SHIPMENT } from '../admin/utils/resources.js';
import { UPDATE_ANY } from '../admin/utils/actions.js';

export default function EditShipmentContainer() {
    const dispatch = useDispatch();

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
        <Permission resource={ SHIPMENT } action={ [UPDATE_ANY] }>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <EditShipment/> }
        </Permission>
    )
}