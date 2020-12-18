import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderDataStatus, selectOrderError } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import Loader from '../shared/components/Loader.js';
import OrderOverview from './OrderOverview.js';
import { fetchOrders } from './duck/thunks.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import { cleanOrderState } from './duck/slice.js';

const OrderOverviewContainer = React.memo(function OrderOverviewContainer() {
    const dispatch = useDispatch();

    const orderDataStatus = useSelector(selectOrderDataStatus);
    const orderError = useSelector(selectOrderError);
    const status = determineStatus(orderDataStatus);
    const errors = getErrors(orderError);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            if (orderDataStatus === 'IDLE') dispatch(fetchOrders());
            fetched.current = true;
        }
    }, [dispatch, orderDataStatus, ]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanOrderState());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <OrderOverview />}
        </>
    );
});

export default OrderOverviewContainer;