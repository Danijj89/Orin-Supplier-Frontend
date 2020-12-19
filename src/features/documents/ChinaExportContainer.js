import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectHomeError, selectHomeDataStatus } from '../home/duck/selectors.js';
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
import { cleanHomeState } from '../home/duck/slice.js';
import { cleanClientState } from '../clients/duck/slice.js';
import { cleanProductState } from '../products/duck/slice.js';
import ChinaExport from './ChinaExport.js';
import { cleanShipmentState } from '../shipments/duck/slice.js';
import { selectProductDataStatus, selectProductError } from '../products/duck/selectors.js';
import { fetchProducts } from '../products/duck/thunks.js';
import { CREATE_ANY } from '../admin/utils/actions.js';
import Permission from '../shared/components/Permission.js';
import { fetchCurrentCompany } from '../home/duck/thunks.js';
import { SHIPMENT } from '../admin/utils/resources.js';

const ChinaExportContainer = React.memo(function ChinaExportContainer() {
    const dispatch = useDispatch();

    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);
    const productDataStatus = useSelector(selectProductDataStatus);
    const productError = useSelector(selectProductError);

    const status = determineStatus(
        homeDataStatus,
        shipmentDataStatus,
        clientDataStatus,
        productDataStatus
    );
    const errors = getErrors(homeError, shipmentError, clientError, productError);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            if (shipmentDataStatus === 'IDLE') dispatch(fetchShipments());
            if (clientDataStatus === 'IDLE') dispatch(fetchClients());
            if (productDataStatus === 'IDLE') dispatch(fetchProducts());
            if (homeDataStatus === 'IDLE') dispatch(fetchCurrentCompany());
            fetched.current = true;
        }
    }, [
        dispatch,
        shipmentDataStatus,
        clientDataStatus,
        productDataStatus,
        homeDataStatus
    ]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeState());
                dispatch(cleanShipmentState());
                dispatch(cleanClientState());
                dispatch(cleanProductState());
            }
            dispatch(cleanNewDocument());
        }
    }, [dispatch, errors.length]);

    return (
        <Permission resource={ SHIPMENT } action={ [CREATE_ANY] }>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <ChinaExport/> }
        </Permission>
    )
});

export default ChinaExportContainer;