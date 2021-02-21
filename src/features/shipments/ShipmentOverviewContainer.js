import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectShipmentDataStatus, selectShipmentError, selectShipmentStatus } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { fetchShipments } from './duck/thunks.js';
import ShipmentOverview from './ShipmentOverview.js';
import { cleanShipmentState } from './duck/slice.js';
import { READ_ANY, READ_OWN } from '../admin/utils/actions.js';
import ShipmentPermission from '../shared/permissions/ShipmentPermission.js';
import StatusHandler from 'features/shared/status/StatusHandler.js';
import { resetShipmentStatus } from 'features/shipments/duck/slice.js';
import { selectClientDataStatus, selectClientError } from 'features/clients/duck/selectors.js';
import { fetchClients } from 'features/clients/duck/thunks.js';
import { cleanClientState } from 'features/clients/duck/slice.js';

const ShipmentOverviewContainer = React.memo(function ShipmentOverviewContainer() {
    const dispatch = useDispatch();

    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);

    const status = determineStatus(shipmentDataStatus, clientDataStatus);
    const errors = getErrors(shipmentError, clientError);

    const shipmentStatus = useSelector(selectShipmentStatus);

    useEffect(() => {
        if (shipmentStatus === 'FULFILLED') return () => dispatch(resetShipmentStatus());
    }, [dispatch, shipmentStatus]);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            if (shipmentDataStatus === 'IDLE') dispatch(fetchShipments());
            if (clientDataStatus === 'IDLE') dispatch(fetchClients());
            fetched.current = true;
        }
    }, [dispatch, shipmentDataStatus, clientDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanShipmentState());
                dispatch(cleanClientState());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <ShipmentPermission action={ [READ_ANY, READ_OWN] }>
            <StatusHandler status={ shipmentStatus } error={ shipmentError }/>
            { status === 'REJECTED' && <ErrorPage error={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <ShipmentOverview/> }
        </ShipmentPermission>
    )
});

export default ShipmentOverviewContainer;