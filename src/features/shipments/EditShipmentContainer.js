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
import { selectCurrentCompany, selectHomeError, selectHomeStatus } from '../home/duck/selectors.js';
import { selectProductDataStatus } from '../products/duck/selectors.js';
import { fetchProducts } from '../products/duck/thunks.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import { selectOrderDataStatus, selectOrderError } from '../orders/duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';

export default function EditShipmentContainer() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const company = useSelector(selectCurrentCompany);
    const shipment = useSelector(state => selectShipmentById(state, id));
    const client = useSelector(state => selectClientById(state, shipment?.consignee));
    const homeStatus = useSelector(selectHomeStatus);
    const shipmentStatus = useSelector(selectShipmentStatus);
    const clientStatus = useSelector(selectClientStatus);
    const productDataStatus = useSelector(selectProductDataStatus);
    const orderDataStatus = useSelector(selectOrderDataStatus);
    const homeError = useSelector(selectHomeError);
    const shipmentError = useSelector(selectShipmentError);
    const clientError = useSelector(selectClientError);
    const productError = useSelector(selectClientError);
    const orderError = useSelector(selectOrderError);

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
        if (productDataStatus === 'IDLE' && company) dispatch(fetchProducts(company._id));
        if (orderDataStatus === 'IDLE' && company) dispatch(fetchOrders(company._id))
    }, [dispatch, id, shipment, client, productDataStatus, orderDataStatus, company]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <EditShipment/> }
        </>
    )
}