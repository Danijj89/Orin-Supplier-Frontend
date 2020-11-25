import React, { useEffect } from 'react';
import Shipment from './Shipment.js';
import { fetchShipmentById } from './duck/thunks.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectShipmentById, selectShipmentStatus } from './duck/selectors.js';
import { useParams } from 'react-router-dom';
import { selectCompanyId, selectHomeDataStatus } from '../home/duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';
import { determineStatus } from '../shared/utils/state.js';
import Loader from '../shared/components/Loader.js';

export default function ShipmentContainer() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const shipmentStatus = useSelector(selectShipmentStatus);
    const homeStatus = useSelector(selectHomeDataStatus);

    const shipment = useSelector(state => selectShipmentById(state, id));
    const companyId = useSelector(selectCompanyId);

    const shouldCheckShipmentStatus = Boolean(!shipment);
    const status = determineStatus(shouldCheckShipmentStatus && shipmentStatus, homeStatus);

    useEffect(() => {
        if (!shipment) dispatch(fetchShipmentById({ id }));
        if (companyId) dispatch(fetchOrders({ companyId }));
    }, [dispatch, id, shipment, companyId]);

    return (
        <>
            { status === 'PENDING' && <Loader /> }
            { status === 'FULFILLED' && <Shipment /> }
        </>
    )
}