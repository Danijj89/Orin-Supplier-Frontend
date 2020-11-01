import React, { useEffect } from 'react';
import Shipment from './Shipment.js';
import { fetchShipmentById } from './duck/thunks.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectShipmentById, selectShipmentStatus } from './duck/selectors.js';
import { useParams } from 'react-router-dom';
import { selectCurrentCompany, selectHomeStatus } from '../home/duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';
import { isLoading } from '../shared/utils/state.js';
import Loader from '../shared/components/Loader.js';

export default function ShipmentContainer() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const shipment = useSelector(state => selectShipmentById(state, id));
    const company = useSelector(selectCurrentCompany);
    const shipmentStatus = useSelector(selectShipmentStatus);
    const homeStatus = useSelector(selectHomeStatus);
    const loading = isLoading([shipmentStatus, homeStatus]);

    useEffect(() => {
        if (!shipment) dispatch(fetchShipmentById({ id }));
        if (company) dispatch(fetchOrders(company._id));
    }, [dispatch, id, shipment, company]);

    return (
        <>
            { loading && <Loader /> }
            { shipment && homeStatus === 'FULFILLED' && <Shipment /> }
        </>
    )
}