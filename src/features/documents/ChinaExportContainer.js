import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyId, selectHomeError, selectHomeDataStatus } from '../home/duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import Loader from '../shared/components/Loader.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import {
    selectShipmentDataStatus,
    selectShipmentError
} from '../shipments/duck/selectors.js';
import { fetchShipments } from '../shipments/duck/thunks.js';
import { selectClientDataStatus, selectClientError } from '../clients/duck/selectors.js';
import { fetchClients } from '../clients/duck/thunks.js';
import { cleanNewDocument } from './duck/slice.js';
import { selectOrderDataStatus, selectOrderError } from '../orders/duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';
import { cleanHomeState } from '../home/duck/slice.js';
import { cleanClientState } from '../clients/duck/slice.js';
import { cleanProductState } from '../products/duck/slice.js';
import ChinaExport from './ChinaExport.js';
import { cleanShipmentState } from '../shipments/duck/slice.js';

const ChinaExportContainer = React.memo(function ChinaExportContainer() {
    const dispatch = useDispatch();

    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);
    // const clientDataStatus = useSelector(selectClientDataStatus);
    // const clientError = useSelector(selectClientError);
    // const orderDataStatus = useSelector(selectOrderDataStatus);
    // const orderError = useSelector(selectOrderError);

    const status = determineStatus(
        homeDataStatus,
        shipmentDataStatus,
        // clientDataStatus,
        // orderDataStatus
    )
    const errors = getErrors(homeError, shipmentError);


    const companyId = useSelector(selectCompanyId);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current && companyId) {
            if (shipmentDataStatus === 'IDLE') dispatch(fetchShipments({ companyId }));
            // dispatch(fetchClients({ companyId }));
            // dispatch(fetchOrders({ companyId }));
            dispatch(cleanNewDocument());
            fetched.current = true;
        }
    }, [dispatch, companyId, shipmentDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeState());
                dispatch(cleanShipmentState());
                // dispatch(cleanClientState());
                // dispatch(cleanProductState());
            }
            dispatch(cleanNewDocument());
        }
    }, [dispatch, errors.length]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <ChinaExport/> }
        </>
    )
});

export default ChinaExportContainer;