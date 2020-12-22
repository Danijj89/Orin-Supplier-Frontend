import React, { useEffect, useRef } from 'react';
import Shipment from './Shipment.js';
import { fetchShipments } from './duck/thunks.js';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectShipmentDataStatus,
    selectShipmentError, selectShipmentStatus
} from './duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import Loader from '../shared/components/Loader.js';
import { cleanCurrentShipmentId, cleanShipmentState } from './duck/slice.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import { selectOrderDataStatus, selectOrderError } from '../orders/duck/selectors.js';
import { cleanOrderState } from '../orders/duck/slice.js';
import { READ_ANY, READ_OWN } from '../admin/utils/actions.js';
import { useParams } from 'react-router-dom';
import ShipmentPermission from '../shared/permissions/ShipmentPermission.js';
import StatusHandler from 'features/shared/status/StatusHandler.js';

const ShipmentContainer = React.memo(function ShipmentContainer() {
    const dispatch = useDispatch();
    const { id: shipmentId } = useParams();

    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);
    const orderDataStatus = useSelector(selectOrderDataStatus);
    const orderError = useSelector(selectOrderError);

    const status = determineStatus(shipmentDataStatus, orderDataStatus);
    const errors = getErrors(shipmentError, orderError);

    const shipmentStatus = useSelector(selectShipmentStatus);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            if (shipmentDataStatus === 'IDLE') dispatch(fetchShipments());
            if (orderDataStatus === 'IDLE') dispatch(fetchOrders());
            fetched.current = true;
        }
    }, [dispatch, shipmentDataStatus, orderDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanOrderState());
                dispatch(cleanShipmentState());
            }
            dispatch(cleanCurrentShipmentId());
        }
    }, [dispatch, errors.length]);

    return (
        <ShipmentPermission action={ [READ_ANY, READ_OWN] } shipmentId={ shipmentId }>
            <StatusHandler status={ shipmentStatus } error={ shipmentError }/>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <Shipment/> }
        </ShipmentPermission>
    )
});

export default ShipmentContainer;