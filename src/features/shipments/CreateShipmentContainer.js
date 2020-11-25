import React, { useEffect, useRef } from 'react';
import CreateShipment from './CreateShipment.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyId, selectHomeDataStatus } from '../home/duck/selectors.js';
import { determineStatus } from '../shared/utils/state.js';
import Loader from '../shared/components/Loader.js';
import { fetchClients } from '../clients/duck/thunks.js';
import { selectClientDataStatus } from '../clients/duck/selectors.js';
import { selectOrderDataStatus } from '../orders/duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';
import { selectCurrentShipmentId } from './duck/selectors.js';
import { Redirect } from 'react-router-dom';
import { fetchShipments } from './duck/thunks.js';

export default function CreateShipmentContainer() {
    const dispatch = useDispatch();
    const companyId = useSelector(selectCompanyId);
    const currentShipmentId = useSelector(selectCurrentShipmentId);
    const homeStatus = useSelector(selectHomeDataStatus);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const orderDataStatus = useSelector(selectOrderDataStatus);
    const status = determineStatus(homeStatus, clientDataStatus, orderDataStatus);

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current && companyId) {
            dispatch(fetchShipments({ companyId }));
            dispatch(fetchClients({ companyId }));
            dispatch(fetchOrders({ companyId }));
            mounted.current = true;
        }
    }, [companyId, dispatch]);

    return (
        <>
            { status === 'PENDING' && <Loader/> }
            { currentShipmentId && <Redirect to={ `/home/shipments/${ currentShipmentId }` }/> }
            { status === 'FULFILLED' && <CreateShipment /> }
        </>
    )
}