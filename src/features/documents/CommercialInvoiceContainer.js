import React, { useEffect, useMemo } from 'react';
import CommercialInvoice from './CommercialInvoice.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCompany, selectHomeError, selectHomeStatus } from '../home/duck/selectors.js';
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

const CommercialInvoiceContainer = React.memo(function CommercialInvoiceContainer() {
    const dispatch = useDispatch();
    const location = useLocation();
    const parsed = queryString.parse(location.search);
    const shipment = useSelector(state => selectShipmentById(state, parsed.shipment));
    const company = useSelector(selectCurrentCompany);
    const homeStatus = useSelector(selectHomeStatus);
    const homeError = useSelector(selectHomeError);
    const shipmentStatus = useSelector(selectShipmentStatus);
    const shipmentError = useSelector(selectShipmentError);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);

    const errors = useMemo(() => [homeError, shipmentError, clientError],
        [homeError, shipmentError, clientError]);

    const status = useMemo(() => determineStatus([
        homeStatus,
        !shipment && shipmentStatus,
        clientDataStatus
    ]), [homeStatus, shipment, shipmentStatus, clientDataStatus]);

    useEffect(() => {
        if (!shipment) dispatch(fetchShipmentById({ id: parsed.shipment }))
        if (clientDataStatus === 'IDLE' && company) dispatch(fetchClients(company._id));
    }, [dispatch, parsed.shipment, shipment, company, clientDataStatus]);

    useEffect(() => {
        return () => dispatch(cleanNewDocument());
    }, [dispatch]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <CommercialInvoice /> }
        </>
    )
});

export default CommercialInvoiceContainer;