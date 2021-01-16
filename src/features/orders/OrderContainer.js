import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderById, selectOrderDataStatus, selectOrderError, selectOrderStatus } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import { selectHomeError, selectHomeDataStatus } from 'features/home/duck/home/selectors.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { fetchOrders } from './duck/thunks.js';
import { selectUserDataStatus, selectUserError } from 'features/home/duck/users/selectors.js';
import { selectClientDataStatus, selectClientError } from '../clients/duck/selectors.js';
import { cleanCurrentOrderId, cleanOrderState } from './duck/slice.js';
import { fetchUsers } from 'features/home/duck/users/thunks.js';
import { fetchClients } from '../clients/duck/thunks.js';
import { selectProductDataStatus, selectProductError } from '../products/duck/selectors.js';
import { fetchProducts } from '../products/duck/thunks.js';
import Order from './Order.js';
import { useParams } from 'react-router-dom';
import { LANGUAGE } from 'app/utils/constants.js';
import { selectShipmentDataStatus, selectShipmentError } from '../shipments/duck/selectors.js';
import { fetchShipments } from '../shipments/duck/thunks.js';
import { cleanHomeState } from 'features/home/duck/home/slice.js';
import { cleanClientState } from '../clients/duck/slice.js';
import { cleanProductState } from '../products/duck/slice.js';
import { cleanUserState } from 'features/home/duck/users/slice.js';
import { cleanShipmentState } from '../shipments/duck/slice.js';
import { fetchCurrentCompany } from 'features/home/duck/home/thunks.js';
import { READ_ANY, READ_OWN } from '../admin/utils/actions.js';
import OrderPermission from '../shared/permissions/OrderPermission.js';
import StatusHandler from 'features/shared/status/StatusHandler.js';

const {
    errorMessages
} = LANGUAGE.order.order;

const OrderContainer = React.memo(function OrderContainer() {
    const dispatch = useDispatch();
    const { id: orderId } = useParams();

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
    const errors = getErrors(
        orderError,
        homeError,
        userError,
        clientError,
        productError,
        shipmentError
    );

    const orderStatus = useSelector(selectOrderStatus);

    const order = useSelector(state => selectOrderById(state, { orderId }));
    const isOrderInactive = useMemo(() => order?.active === false
        || (!order && orderDataStatus === 'FULFILLED'), [order, orderDataStatus]);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            if (orderDataStatus === 'IDLE') dispatch(fetchOrders());
            if (userDataStatus === 'IDLE') dispatch(fetchUsers());
            if (clientDataStatus === 'IDLE') dispatch(fetchClients());
            if (productDataStatus === 'IDLE') dispatch(fetchProducts());
            if (shipmentDataStatus === 'IDLE') dispatch(fetchShipments());
            if (homeDataStatus === 'IDLE') dispatch(fetchCurrentCompany());
            fetched.current = true;
        }
    }, [
        dispatch,
        orderDataStatus,
        userDataStatus,
        clientDataStatus,
        productDataStatus,
        shipmentDataStatus,
        homeDataStatus
    ]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanOrderState());
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
        <OrderPermission action={ [READ_ANY, READ_OWN] } orderId={ orderId }>
            <StatusHandler status={ orderStatus } error={ orderError }/>
            { isOrderInactive && <ErrorPage error={ [errorMessages.orderWasDeleted] }/> }
            { status === 'REJECTED' && <ErrorPage error={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { !isOrderInactive && status === 'FULFILLED' && <Order/> }
        </OrderPermission>
    )
});

export default OrderContainer;