import React, { useEffect, useMemo, useRef } from 'react';
import Shipment from './Shipment.js';
import { fetchShipments } from './duck/thunks.js';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectShipmentById,
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
import { resetShipmentStatus } from 'features/shipments/duck/slice.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { selectUserDataStatus, selectUserError } from 'features/home/duck/users/selectors.js';
import { fetchUsers } from 'features/home/duck/users/thunks.js';
import { cleanUserState } from 'features/home/duck/users/slice.js';

const {
    errorMessages
} = LANGUAGE.shipment.shipment;

const ShipmentContainer = React.memo(function ShipmentContainer() {
    const dispatch = useDispatch();
    const { id: shipmentId } = useParams();

    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);
    const orderDataStatus = useSelector(selectOrderDataStatus);
    const orderError = useSelector(selectOrderError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);

    const status = determineStatus(shipmentDataStatus, orderDataStatus, userDataStatus);
    const errors = getErrors(shipmentError, orderError, userError);

    const shipmentStatus = useSelector(selectShipmentStatus);

    const shipment = useSelector(state => selectShipmentById(state, { shipmentId }));
    const shipmentMissing = useMemo(() => shipmentDataStatus === 'FULFILLED' && !shipment,
        [shipmentDataStatus, shipment]);

    useEffect(() => {
        if (shipmentStatus === 'FULFILLED') return () => dispatch(resetShipmentStatus());
    }, [dispatch, shipmentStatus]);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            if (shipmentDataStatus === 'IDLE') dispatch(fetchShipments());
            if (orderDataStatus === 'IDLE') dispatch(fetchOrders());
            if (userDataStatus === 'IDLE') dispatch(fetchUsers());
            fetched.current = true;
        }
    }, [dispatch, shipmentDataStatus, orderDataStatus, userDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanOrderState());
                dispatch(cleanShipmentState());
                dispatch(cleanUserState());
            }
            dispatch(cleanCurrentShipmentId());
        }
    }, [dispatch, errors.length]);

    return (
        <ShipmentPermission action={ [READ_ANY, READ_OWN] } shipmentId={ shipmentId }>
            <StatusHandler status={ shipmentStatus } error={ shipmentError } showSuccess/>
            { shipmentMissing && <ErrorPage error={ errorMessages.shipmentNonExistent }/> }
            { status === 'REJECTED' && <ErrorPage error={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <Shipment/> }
        </ShipmentPermission>
    )
});

export default ShipmentContainer;