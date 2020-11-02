import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectShipmentById, selectShipmentStatus } from './duck/selectors.js';
import { fetchShipmentById } from './duck/thunks.js';
import { determineStatus } from '../shared/utils/state.js';
import Loader from '../shared/components/Loader.js';
import EditShipment from './EditShipment.js';
import { selectClientById, selectClientStatus } from '../clients/duck/selectors.js';
import { fetchClientById } from '../clients/duck/thunks.js';
import { selectHomeStatus } from '../home/duck/selectors.js';

export default function EditShipmentContainer() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const shipment = useSelector(state => selectShipmentById(state, id));
    const client = useSelector(state => selectClientById(state, shipment?.consignee));
    const homeStatus = useSelector(selectHomeStatus);
    const shipmentStatus = useSelector(selectShipmentStatus);
    const clientStatus = useSelector(selectClientStatus);
    const status = determineStatus([
        homeStatus,
        !shipment && shipmentStatus,
        !client && clientStatus
    ]);

    useEffect(() => {
        if (!shipment) dispatch(fetchShipmentById({ id }));
        if (shipment && !client) dispatch(fetchClientById(shipment.consignee));
    }, [dispatch, id, shipment, client]);

    return (
        <>
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <EditShipment /> }
        </>
    )
}