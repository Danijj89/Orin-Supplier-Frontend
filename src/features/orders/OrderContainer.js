import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderById, selectOrderDataStatus, selectOrderError } from './duck/selectors.js';
import { determineStatus } from '../shared/utils/state.js';
import { selectCompanyId, selectHomeError, selectHomeStatus } from '../home/duck/selectors.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { fetchOrders } from './duck/thunks.js';
import { selectUserDataStatus, selectUserError } from '../users/duck/selectors.js';
import { selectClientDataStatus, selectClientError } from '../clients/duck/selectors.js';
import { cleanCurrentOrderId } from './duck/slice.js';
import { fetchUsers } from '../users/duck/thunks.js';
import { fetchClients } from '../clients/duck/thunks.js';
import { selectProductDataStatus, selectProductError } from '../products/duck/selectors.js';
import { fetchProducts } from '../products/duck/thunks.js';
import Order from './Order.js';
import { Redirect, useParams } from 'react-router-dom';

const OrderContainer = React.memo(function OrderContainer() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const orderDataStatus = useSelector(selectOrderDataStatus);
    const orderError = useSelector(selectOrderError);
    const homeStatus = useSelector(selectHomeStatus);
    const homeError = useSelector(selectHomeError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);
    const productDataStatus = useSelector(selectProductDataStatus);
    const productError = useSelector(selectProductError);
    const status = determineStatus([
        orderDataStatus,
        homeStatus,
        userDataStatus,
        clientDataStatus,
        productDataStatus
    ]);
    const errors = [orderError, homeError, userError, clientError, productError];

    const companyId = useSelector(selectCompanyId);
    const order = useSelector(state => selectOrderById(state, id));

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current && companyId) {
            if (orderDataStatus === 'IDLE') dispatch(fetchOrders({ companyId }));
            dispatch(fetchUsers({ companyId }));
            dispatch(fetchClients({ companyId }));
            dispatch(fetchProducts({ companyId }));
            fetched.current = true;
        }
    }, [dispatch, orderDataStatus, companyId]);

    useEffect(() => {
        return () => dispatch(cleanCurrentOrderId());
    }, [dispatch]);

    return (
        <>
            { order?.active === false && <Redirect to={ '/home/orders' }/> }
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <Order/> }
        </>
    )
});

export default OrderContainer;