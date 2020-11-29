import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyId, selectHomeError, selectHomeDataStatus } from '../home/duck/selectors.js';
import { selectShipmentDataStatus, selectShipmentError } from '../shipments/duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { fetchShipments } from '../shipments/duck/thunks.js';
import PackingList from './PackingList.js';
import { selectClientDataStatus, selectClientError } from '../clients/duck/selectors.js';
import { fetchClients } from '../clients/duck/thunks.js';
import { cleanNewDocument } from './duck/slice.js';
import { cleanHomeState } from '../home/duck/slice.js';
import { cleanClientState } from '../clients/duck/slice.js';
import { cleanShipmentState } from '../shipments/duck/slice.js';

const PackingListContainer = React.memo(function PackingListContainer() {
    const dispatch = useDispatch();

    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);

    const status = determineStatus(homeDataStatus, shipmentDataStatus, clientDataStatus);
    const errors = getErrors(homeError, shipmentError, clientError);

    const companyId = useSelector(selectCompanyId);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current && companyId) {
            if (shipmentDataStatus === 'IDLE') dispatch(fetchShipments({ companyId }));
            dispatch(cleanNewDocument());
            dispatch(fetchClients({ companyId }));
            fetched.current = true;
        }
    }, [dispatch, shipmentDataStatus, companyId]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeState());
                dispatch(cleanClientState());
                dispatch(cleanShipmentState());
            }
            dispatch(cleanNewDocument());
        }
    }, [dispatch, errors.length]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <PackingList/> }
        </>
    )
});

export default PackingListContainer;