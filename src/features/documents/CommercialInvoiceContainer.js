import React, { useEffect, useMemo } from 'react';
import CommercialInvoice from './CommercialInvoice.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyId, selectHomeError, selectHomeStatus } from '../home/duck/selectors.js';
import { determineStatus } from '../shared/utils/state.js';
import Loader from '../shared/components/Loader.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { selectShipmentById, selectShipmentError, selectShipmentStatus } from '../shipments/duck/selectors.js';
import { fetchShipmentById } from '../shipments/duck/thunks.js';
import { selectClientDataStatus, selectClientError } from '../clients/duck/selectors.js';
import { fetchClients } from '../clients/duck/thunks.js';
import { cleanNewDocument } from './duck/slice.js';
import { selectOrderDataStatus, selectOrderError } from '../orders/duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';

const CommercialInvoiceContainer = React.memo(function CommercialInvoiceContainer() {
    const dispatch = useDispatch();
    const location = useLocation();
    const parsed = queryString.parse(location.search);
    const homeStatus = useSelector(selectHomeStatus);
    const homeError = useSelector(selectHomeError);
    const shipmentStatus = useSelector(selectShipmentStatus);
    const shipmentError = useSelector(selectShipmentError);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);
    const orderDataStatus = useSelector(selectOrderDataStatus);
    const orderError = useSelector(selectOrderError);

    const shipment = useSelector(state => selectShipmentById(state, parsed.shipment));
    const companyId = useSelector(selectCompanyId);

    const errors = useMemo(() => [homeError, shipmentError, clientError, orderError],
        [homeError, shipmentError, clientError, orderError]);

    const status = useMemo(() => determineStatus([
        homeStatus,
        !shipment && shipmentStatus,
        clientDataStatus,
        orderDataStatus
    ]), [
        homeStatus,
        shipment,
        shipmentStatus,
        clientDataStatus,
        orderDataStatus
    ]);

    useEffect(() => {
        if (!shipment) dispatch(fetchShipmentById({ id: parsed.shipment }))
        if (clientDataStatus === 'IDLE' && companyId) dispatch(fetchClients(companyId));
        if (orderDataStatus === 'IDLE' && companyId) dispatch(fetchOrders({ companyId }));
    }, [dispatch, parsed.shipment, shipment, companyId, clientDataStatus, orderDataStatus]);

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