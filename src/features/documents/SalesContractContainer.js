import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyId, selectHomeError, selectHomeDataStatus } from '../home/duck/selectors.js';
import { selectShipmentDataStatus, selectShipmentError } from '../shipments/duck/selectors.js';
import { selectClientDataStatus, selectClientError } from '../clients/duck/selectors.js';
import { determineStatus } from '../shared/utils/state.js';
import { cleanNewDocument } from './duck/slice.js';
import { fetchShipments } from '../shipments/duck/thunks.js';
import { fetchClients } from '../clients/duck/thunks.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import SalesContract from './SalesContract.js';

const SalesContractContainer = React.memo(function SalesContractContainer() {
    const dispatch = useDispatch();

    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);

    const status = determineStatus(homeDataStatus, shipmentDataStatus, clientDataStatus);
    const errors = [homeError, shipmentError, clientError];

    const companyId = useSelector(selectCompanyId);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current && companyId) {
            if (shipmentDataStatus === 'IDLE') dispatch(fetchShipments({ companyId }));
            dispatch(fetchClients({ companyId }));
            fetched.current = true;
        }
    }, [dispatch, shipmentDataStatus, companyId]);

    useEffect(() => {
        return () => dispatch(cleanNewDocument());
    }, [dispatch]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <SalesContract/> }
        </>
    )

});

export default SalesContractContainer;