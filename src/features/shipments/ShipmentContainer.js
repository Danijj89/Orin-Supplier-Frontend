import React, { useEffect, useRef } from 'react';
import Shipment from './Shipment.js';
import { fetchShipments } from './duck/thunks.js';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectShipmentDataStatus,
    selectShipmentError
} from './duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import Loader from '../shared/components/Loader.js';
import { cleanCurrentShipmentId, cleanShipmentState } from './duck/slice.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import { selectOrderDataStatus, selectOrderError } from '../orders/duck/selectors.js';
import { cleanOrderState } from '../orders/duck/slice.js';
import Permission from '../shared/components/Permission.js';
import { SHIPMENT } from '../admin/utils/resources.js';
import { READ_ANY } from '../admin/utils/actions.js';

const ShipmentContainer = React.memo(function ShipmentContainer() {
    const dispatch = useDispatch();
    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);
    const orderDataStatus = useSelector(selectOrderDataStatus);
    const orderError = useSelector(selectOrderError);

    const status = determineStatus(shipmentDataStatus, orderDataStatus);
    const errors = getErrors(shipmentError, orderError);

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
        <Permission resource={ SHIPMENT } action={ [READ_ANY] }>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <Shipment/> }
        </Permission>
    )
});

export default ShipmentContainer;