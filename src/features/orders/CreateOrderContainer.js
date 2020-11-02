import React, { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startNewOrder } from './duck/thunks.js';
import {
    selectCurrentOrderId,
    selectOrderError, selectOrderStatus,
} from './duck/selectors.js';
import Loader from '../shared/components/Loader.js';
import ErrorDisplay from '../shared/components/ErrorDisplay.js';
import { selectCurrentCompany } from '../home/duck/selectors.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import { determineStatus } from '../shared/utils/state.js';
import { selectClientDataStatus } from '../clients/duck/selectors.js';
import { fetchClients } from '../clients/duck/thunks.js';
import CreateOrder from './CreateOrder.js';
import { selectProductStatus } from '../products/duck/selectors.js';
import { fetchProducts } from '../products/duck/thunks.js';
import { cleanNewOrder } from './duck/slice.js';

export default function CreateOrderContainer() {
    const dispatch = useDispatch();
    const userId = useSelector(selectCurrentUserId);
    const company = useSelector(selectCurrentCompany);
    const orderStatus = useSelector(selectOrderStatus);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const productStatus = useSelector(selectProductStatus);
    const error = useSelector(selectOrderError);
    const currentOrderId = useSelector(selectCurrentOrderId);
    const status = determineStatus([orderStatus, clientDataStatus, productStatus]);

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current && company) {
            dispatch(startNewOrder({ userId, companyId: company._id }));
            dispatch(fetchClients(company._id));
            dispatch(fetchProducts(company._id));
            mounted.current = true;
        }
        return () => dispatch(cleanNewOrder());
    }, [dispatch, company, userId]);

    return (
        <>
            { status === 'PENDING' && <Loader/> }
            { currentOrderId && <Redirect to={ `/home/orders/${ currentOrderId }` }/> }
            { error && <ErrorDisplay errors={ [error] }/> }
            { !currentOrderId && status === 'FULFILLED' && <CreateOrder /> }
        </>
    );
}