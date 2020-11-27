import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectShipmentDataStatus, selectShipmentError } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { selectCompanyId, selectHomeError, selectHomeDataStatus } from '../home/duck/selectors.js';
import { fetchShipments } from './duck/thunks.js';
import ShipmentOverview from './ShipmentOverview.js';
import { cleanHomeError } from '../home/duck/slice.js';
import { cleanShipmentError } from './duck/slice.js';

const ShipmentOverviewContainer = React.memo(function ShipmentOverviewContainer() {
    const dispatch = useDispatch();
    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);
    const homeStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);

    const status = determineStatus(shipmentDataStatus, homeStatus);
    const errors = getErrors(shipmentError, homeError);

    const companyId = useSelector(selectCompanyId);

    useEffect(() => {
        if (shipmentDataStatus === 'IDLE' && companyId)
            dispatch(fetchShipments({ companyId }));
    }, [dispatch, companyId, shipmentDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeError());
                dispatch(cleanShipmentError());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <ShipmentOverview/> }
        </>
    )
});

export default ShipmentOverviewContainer;