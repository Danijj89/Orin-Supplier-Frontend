import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectShipmentById, selectShipmentError, selectShipmentStatus } from './duck/selectors.js';
import { fetchShipmentById } from './duck/thunks.js';
import { determineStatus } from '../shared/utils/state.js';
import Loader from '../shared/components/Loader.js';
import EditShipment from './EditShipment.js';
import { selectClientById, selectClientError, selectClientStatus } from '../clients/duck/selectors.js';
import { fetchClientById } from '../clients/duck/thunks.js';
import { selectCompanyId, selectHomeError, selectHomeDataStatus } from '../home/duck/selectors.js';
import { selectProductDataStatus } from '../products/duck/selectors.js';
import { fetchProducts } from '../products/duck/thunks.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import { selectOrderDataStatus, selectOrderError } from '../orders/duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';

export default function EditShipmentContainer() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const homeStatus = useSelector(selectHomeDataStatus);
    const shipmentStatus = useSelector(selectShipmentStatus);
    const clientStatus = useSelector(selectClientStatus);
    const productDataStatus = useSelector(selectProductDataStatus);
    const orderDataStatus = useSelector(selectOrderDataStatus);
    const homeError = useSelector(selectHomeError);
    const shipmentError = useSelector(selectShipmentError);
    const clientError = useSelector(selectClientError);
    const productError = useSelector(selectClientError);
    const orderError = useSelector(selectOrderError);

    const companyId = useSelector(selectCompanyId);
    const shipment = useSelector(state => selectShipmentById(state, id));
    const client = useSelector(state => selectClientById(state, shipment?.consignee));

    const errors = [homeError, shipmentError, clientError, productError, orderError];

    const status = determineStatus([
        homeStatus,
        productDataStatus,
        !shipment && shipmentStatus,
        !client && clientStatus,
        orderDataStatus
    ]);

    useEffect(() => {
        if (!shipment) dispatch(fetchShipmentById({ id }));
        if (shipment && !client) dispatch(fetchClientById(shipment.consignee));
        if (productDataStatus === 'IDLE' && companyId) dispatch(fetchProducts({ companyId }));
        if (orderDataStatus === 'IDLE' && companyId) dispatch(fetchOrders({ companyId }))
    }, [dispatch, id, shipment, client, productDataStatus, orderDataStatus, companyId]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <EditShipment/> }
        </>
    )
}