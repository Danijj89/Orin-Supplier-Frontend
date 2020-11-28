import React, { useEffect, useRef } from 'react';
import Shipment from './Shipment.js';
import { fetchShipments } from './duck/thunks.js';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectShipmentDataStatus,
    selectShipmentError
} from './duck/selectors.js';
import { selectCompanyId, selectHomeDataStatus, selectHomeError } from '../home/duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import Loader from '../shared/components/Loader.js';
import { cleanHomeState } from '../home/duck/slice.js';
import { cleanUserState } from '../users/duck/slice.js';
import { cleanClientState } from '../clients/duck/slice.js';
import { cleanProductState } from '../products/duck/slice.js';
import { cleanCurrentShipmentId, cleanShipmentState } from './duck/slice.js';
import ErrorPage from '../shared/components/ErrorPage.js';

const ShipmentContainer = React.memo(function ShipmentContainer() {
    const dispatch = useDispatch();
    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);
    const homeStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);

    const status = determineStatus(shipmentDataStatus, homeStatus);
    const errors = getErrors(shipmentError, homeError);

    const companyId = useSelector(selectCompanyId);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current && companyId) {
            if (shipmentDataStatus === 'IDLE') dispatch(fetchShipments({ companyId }));
            dispatch(fetchOrders({ companyId }));
            fetched.current = true;
        }
    }, [dispatch, companyId, shipmentDataStatus]);

    const mounted = useRef(false);
    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeState());
                dispatch(cleanUserState());
                dispatch(cleanClientState());
                dispatch(cleanProductState());
                dispatch(cleanShipmentState());
            }
            if (mounted.current) dispatch(cleanCurrentShipmentId());
            mounted.current = false;
        }
    }, [dispatch, errors.length]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <Shipment/> }
        </>
    )
});

export default ShipmentContainer;