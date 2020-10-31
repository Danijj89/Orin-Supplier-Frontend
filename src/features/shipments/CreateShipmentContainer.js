import React, { useEffect, useRef } from 'react';
import { Box } from '@material-ui/core';
import CreateShipment from './CreateShipment.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCompany, selectHomeStatus } from '../home/duck/selectors.js';
import { isLoading } from '../shared/utils/store.js';
import Loader from '../shared/components/Loader.js';
import { fetchClients } from '../clients/duck/thunks.js';
import { selectClientStatus } from '../clients/duck/selectors.js';
import { selectOrderStatus } from '../orders/duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';
import { selectCurrentShipmentId } from './duck/selectors.js';
import { Redirect } from 'react-router-dom';
import { fetchShipments } from './duck/thunks.js';

export default function CreateShipmentContainer() {
    const dispatch = useDispatch();
    const company = useSelector(selectCurrentCompany);
    const currentShipmentId = useSelector(selectCurrentShipmentId);
    const homeStatus = useSelector(selectHomeStatus);
    const clientStatus = useSelector(selectClientStatus);
    const orderStatus = useSelector(selectOrderStatus);
    const loading = isLoading([homeStatus, clientStatus, orderStatus]);

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current && company) {
            dispatch(fetchShipments({ companyId: company._id }));
            dispatch(fetchClients(company._id));
            dispatch(fetchOrders(company._id));
            mounted.current = true;
        }
    }, [company, dispatch]);

    return (
        <Box>
            { currentShipmentId && <Redirect to={ `/home/shipments/${ currentShipmentId }` }/> }
            { loading && <Loader/> }
            { !loading && homeStatus === 'FULFILLED' && <CreateShipment/> }
        </Box>
    )
}