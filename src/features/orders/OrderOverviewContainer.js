import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderDataStatus, selectOrderError } from './duck/selectors.js';
import { determineStatus } from '../shared/utils/state.js';
import Loader from '../shared/components/Loader.js';
import OrderOverview from './OrderOverview.js';
import { fetchOrders } from './duck/thunks.js';
import { cleanOrderError } from './duck/slice.js';
import { selectCompanyId, selectHomeError, selectHomeDataStatus } from '../home/duck/selectors.js';
import ErrorPage from '../shared/components/ErrorPage.js';

const OrderOverviewContainer = React.memo(function OrderOverviewContainer() {
    const dispatch = useDispatch();
    const homeStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const orderDataStatus = useSelector(selectOrderDataStatus);
    const orderError = useSelector(selectOrderError);
    const status = determineStatus([orderDataStatus, homeStatus]);
    const errors = [orderError, homeError];

    const companyId = useSelector(selectCompanyId);

    useEffect(() => {
        if (orderDataStatus === 'IDLE' && companyId)
            dispatch(fetchOrders({ companyId }));
    }, [dispatch, orderDataStatus, companyId]);

    useEffect(() => {
        return () => dispatch(cleanOrderError());
    }, [dispatch]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <OrderOverview />}
        </>
    );
});

export default OrderOverviewContainer;