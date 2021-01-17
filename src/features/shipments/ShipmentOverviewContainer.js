import React, { useEffect } from 'react';
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

const ShipmentOverviewContainer = React.memo(function ShipmentOverviewContainer() {
    const dispatch = useDispatch();
    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);

    const status = determineStatus(shipmentDataStatus);
    const errors = getErrors(shipmentError);

    const shipmentStatus = useSelector(selectShipmentStatus);

    useEffect(() => {
        return () => {
            if (shipmentStatus === 'FULFILLED') dispatch(resetShipmentStatus());
        }
    }, [dispatch, shipmentStatus]);

    useEffect(() => {
        if (shipmentDataStatus === 'IDLE') dispatch(fetchShipments());
    }, [dispatch, shipmentDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanShipmentState());
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