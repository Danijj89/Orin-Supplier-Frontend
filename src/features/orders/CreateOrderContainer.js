import React, { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startNewOrder } from './duck/thunks.js';
import {
    selectCurrentOrderId,
    selectOrderError, selectOrderStatus,
} from './duck/selectors.js';
import Loader from '../shared/components/Loader.js';
import ErrorMessages from '../shared/components/ErrorMessages.js';
import { selectCompanyId } from '../home/duck/selectors.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import { determineStatus } from '../shared/utils/state.js';
import { selectClientDataStatus } from '../clients/duck/selectors.js';
import { fetchClients } from '../clients/duck/thunks.js';
import CreateOrder from './CreateOrder.js';
import { selectProductDataStatus } from '../products/duck/selectors.js';
import { fetchProducts } from '../products/duck/thunks.js';
import { cleanNewOrder } from './duck/slice.js';

export default function CreateOrderContainer() {
    const dispatch = useDispatch();
    const userId = useSelector(selectCurrentUserId);
    const companyId = useSelector(selectCompanyId);
    const orderStatus = useSelector(selectOrderStatus);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const productDataStatus = useSelector(selectProductDataStatus);
    const error = useSelector(selectOrderError);
    const currentOrderId = useSelector(selectCurrentOrderId);
    const status = determineStatus([orderStatus, clientDataStatus, productDataStatus]);

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current && companyId) {
            dispatch(startNewOrder({ userId, companyId }));
            dispatch(fetchClients({ companyId }));
            dispatch(fetchProducts({ companyId }));
            mounted.current = true;
        }
        return () => dispatch(cleanNewOrder());
    }, [dispatch, companyId, userId]);

    return (
        <>
            { status === 'PENDING' && <Loader/> }
            { currentOrderId && <Redirect to={ `/home/orders/${ currentOrderId }` }/> }
            { error && <ErrorMessages errors={ [error] }/> }
            { !currentOrderId && status === 'FULFILLED' && <CreateOrder/> }
        </>
    );
}