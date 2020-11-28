import React, { useEffect, useMemo, useRef } from 'react';
import CommercialInvoice from './CommercialInvoice.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyId, selectHomeError, selectHomeDataStatus } from '../home/duck/selectors.js';
import { determineStatus } from '../shared/utils/state.js';
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

const CommercialInvoiceContainer = React.memo(function CommercialInvoiceContainer() {
    const dispatch = useDispatch();

    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);
    const orderDataStatus = useSelector(selectOrderDataStatus);
    const orderError = useSelector(selectOrderError);

    const errors = useMemo(() => [homeError, shipmentError, clientError, orderError],
        [homeError, shipmentError, clientError, orderError]);

    const status = useMemo(() => determineStatus(
        homeDataStatus,
        shipmentDataStatus,
        clientDataStatus,
        orderDataStatus
    ), [
        homeDataStatus,
        shipmentDataStatus,
        clientDataStatus,
        orderDataStatus
    ]);

    const companyId = useSelector(selectCompanyId);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current && companyId) {
            dispatch(cleanNewDocument());
            if (shipmentDataStatus === 'IDLE') dispatch(fetchShipments({ companyId }));
            dispatch(fetchClients({ companyId }));
            dispatch(fetchOrders({ companyId }));
            fetched.current = true;
        }
    }, [dispatch, companyId, shipmentDataStatus]);

    useEffect(() => {
        return () => dispatch(cleanNewDocument());
    }, [dispatch]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <CommercialInvoice/> }
        </>
    )
});

export default CommercialInvoiceContainer;