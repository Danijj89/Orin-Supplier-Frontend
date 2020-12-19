import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectShipmentDataStatus, selectShipmentError } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { fetchShipments } from './duck/thunks.js';
import ShipmentOverview from './ShipmentOverview.js';
import { cleanShipmentState } from './duck/slice.js';
import { SHIPMENT } from '../admin/utils/resources.js';
import { READ_ANY, READ_OWN } from '../admin/utils/actions.js';
import ShipmentPermission from '../shared/permissions/ShipmentPermission.js';

const ShipmentOverviewContainer = React.memo(function ShipmentOverviewContainer() {
    const dispatch = useDispatch();
    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);

    const status = determineStatus(shipmentDataStatus);
    const errors = getErrors(shipmentError);

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
        <ShipmentPermission resource={ SHIPMENT } action={ [READ_ANY, READ_OWN] }>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <ShipmentOverview/> }
        </ShipmentPermission>
    )
});

export default ShipmentOverviewContainer;