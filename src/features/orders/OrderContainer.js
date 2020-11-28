import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderById, selectOrderDataStatus, selectOrderError } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import { selectCompanyId, selectHomeError, selectHomeDataStatus } from '../home/duck/selectors.js';
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
import { useParams } from 'react-router-dom';
import { LANGUAGE } from '../../app/utils/constants.js';
import { selectShipmentDataStatus, selectShipmentError } from '../shipments/duck/selectors.js';
import { fetchShipments } from '../shipments/duck/thunks.js';
import { cleanHomeState } from '../home/duck/slice.js';
import { cleanClientState } from '../clients/duck/slice.js';
import { cleanProductState } from '../products/duck/slice.js';
import { cleanUserState } from '../users/duck/slice.js';
import { cleanShipmentState } from '../shipments/duck/slice.js';

const {
    errorMessages
} = LANGUAGE.order.order;

const OrderContainer = React.memo(function OrderContainer() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const orderDataStatus = useSelector(selectOrderDataStatus);
    const orderError = useSelector(selectOrderError);
    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const clientError = useSelector(selectClientError);
    const productDataStatus = useSelector(selectProductDataStatus);
    const productError = useSelector(selectProductError);
    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);

    const status = determineStatus(
        orderDataStatus,
        homeDataStatus,
        userDataStatus,
        clientDataStatus,
        productDataStatus,
        shipmentDataStatus
    );
    const errors = getErrors(orderError, homeError, userError, clientError, productError, shipmentError);

    const companyId = useSelector(selectCompanyId);
    const order = useSelector(state => selectOrderById(state, id));
    const isOrderInactive = useMemo(() => order?.active === false, [order]);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current && companyId) {
            if (orderDataStatus === 'IDLE') dispatch(fetchOrders({ companyId }));
            dispatch(fetchUsers({ companyId }));
            dispatch(fetchClients({ companyId }));
            dispatch(fetchProducts({ companyId }));
            dispatch(fetchShipments({ companyId }));
            fetched.current = true;
        }
    }, [dispatch, orderDataStatus, companyId]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeState());
                dispatch(cleanUserState());
                dispatch(cleanClientState());
                dispatch(cleanProductState());
                dispatch(cleanShipmentState());
            }
            dispatch(cleanCurrentOrderId());
        }
    }, [dispatch, errors.length]);

    return (
        <>
            { isOrderInactive && <ErrorPage errors={ [errorMessages.orderWasDeleted] }/> }
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { !isOrderInactive && status === 'FULFILLED' && <Order/> }
        </>
    )
});

export default OrderContainer;