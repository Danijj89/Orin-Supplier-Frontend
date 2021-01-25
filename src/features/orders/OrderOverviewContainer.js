import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderDataStatus, selectOrderError, selectOrderStatus } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import Loader from '../shared/components/Loader.js';
import OrderOverview from './OrderOverview.js';
import { fetchOrders } from './duck/thunks.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import { cleanOrderState, resetOrderStatus } from './duck/slice.js';
import { READ_ANY, READ_OWN } from '../admin/utils/actions.js';
import OrderPermission from '../shared/permissions/OrderPermission.js';
import StatusHandler from 'features/shared/status/StatusHandler.js';

const OrderOverviewContainer = React.memo(function OrderOverviewContainer() {
    const dispatch = useDispatch();

    const orderDataStatus = useSelector(selectOrderDataStatus);
    const orderError = useSelector(selectOrderError);
    const status = determineStatus(orderDataStatus);
    const errors = getErrors(orderError);

    const orderStatus = useSelector(selectOrderStatus);

    useEffect(() => {
        if (orderStatus === 'FULFILLED') return () => dispatch(resetOrderStatus());
    }, [dispatch, orderStatus]);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            if (orderDataStatus === 'IDLE') dispatch(fetchOrders());
            fetched.current = true;
        }
    }, [dispatch, orderDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanOrderState());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <OrderPermission action={ [READ_ANY, READ_OWN] }>
            <StatusHandler status={ orderStatus } error={ orderError } showSuccess/>
            { status === 'REJECTED' && <ErrorPage error={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <OrderOverview/> }
        </OrderPermission>
    );
});

export default OrderOverviewContainer;