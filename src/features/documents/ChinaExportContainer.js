import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectHomeError, selectHomeDataStatus } from 'features/home/duck/home/selectors.js';
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
import { cleanHomeState } from 'features/home/duck/home/slice.js';
import { cleanClientState } from '../clients/duck/slice.js';
import { cleanProductState } from '../products/duck/slice.js';
import ChinaExport from './ChinaExport.js';
import { cleanShipmentState } from '../shipments/duck/slice.js';
import { selectProductDataStatus, selectProductError } from '../products/duck/selectors.js';
import { fetchProducts } from '../products/duck/thunks.js';
import { CREATE_ANY, CREATE_OWN } from '../admin/utils/actions.js';
import { fetchCurrentCompany } from 'features/home/duck/home/thunks.js';
import ShipmentPermission from '../shared/permissions/ShipmentPermission.js';

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

    useEffect(() => {
        if (shipmentDataStatus === 'IDLE') dispatch(fetchShipments());
        if (clientDataStatus === 'IDLE') dispatch(fetchClients());
        if (productDataStatus === 'IDLE') dispatch(fetchProducts());
        if (homeDataStatus === 'IDLE') dispatch(fetchCurrentCompany());
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
        <ShipmentPermission action={ [CREATE_ANY, CREATE_OWN] }>
            { status === 'REJECTED' && <ErrorPage error={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <ChinaExport/> }
        </ShipmentPermission>
    );
});

export default ChinaExportContainer;