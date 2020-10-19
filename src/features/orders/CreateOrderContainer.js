import React, { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startNewOrder } from './duck/thunks.js';
import { Box } from '@material-ui/core';
import { selectCurrentOrderId, selectNewOrder, selectOrderError, selectOrderStatus } from './duck/selectors.js';
import Loader from '../shared/components/Loader.js';
import ErrorDisplay from '../shared/components/ErrorDisplay.js';
import { cleanNewOrder } from './duck/slice.js';
import { selectCurrentCompany } from '../home/duck/selectors.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import { isLoading } from '../shared/utils/store.js';
import { selectClientStatus } from '../clients/duck/selectors.js';
import { fetchClients } from '../clients/duck/thunks.js';
import CreateOrder from './CreateOrder.js';
import { selectProductStatus } from '../products/duck/selectors.js';
import { fetchProducts } from '../products/duck/thunks.js';

export default function CreateOrderContainer() {
    const dispatch = useDispatch();
    const userId = useSelector(selectCurrentUserId);
    const newOrder = useSelector(selectNewOrder);
    const company = useSelector(selectCurrentCompany);
    const orderStatus = useSelector(selectOrderStatus);
    const clientStatus = useSelector(selectClientStatus);
    const productStatus = useSelector(selectProductStatus);
    const error = useSelector(selectOrderError);
    const currentOrderId = useSelector(selectCurrentOrderId);
    const loading = isLoading([orderStatus, clientStatus, productStatus]);

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current && company) {
            dispatch(startNewOrder({ userId, companyId: company._id }));
            dispatch(fetchClients(company._id));
            dispatch(fetchProducts(company._id));
            mounted.current = true;
        }
        return () => dispatch(cleanNewOrder);
    }, [dispatch, company, userId, clientStatus]);

    return (
        <Box>
            { currentOrderId && <Redirect to={ `/home/orders/${ currentOrderId }` }/> }
            { loading && <Loader/> }
            { error && <ErrorDisplay errors={ [error] }/> }
            { newOrder && !loading &&
            <CreateOrder newOrder={newOrder}/>
            }
        </Box>
    );
}