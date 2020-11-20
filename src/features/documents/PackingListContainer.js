import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyId, selectHomeError, selectHomeStatus } from '../home/duck/selectors.js';
import { selectShipmentDataStatus, selectShipmentError } from '../shipments/duck/selectors.js';
import { determineStatus } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { fetchShipments } from '../shipments/duck/thunks.js';
import PackingList from './PackingList.js';

const PackingListContainer = React.memo(function PackingListContainer() {
    const dispatch = useDispatch();

    const homeStatus = useSelector(selectHomeStatus);
    const homeError = useSelector(selectHomeError);
    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const shipmentError = useSelector(selectShipmentError);

    const status = determineStatus([homeStatus, shipmentDataStatus]);
    const errors = [homeError, shipmentError];

    const companyId = useSelector(selectCompanyId);

    useEffect(() => {
        if (companyId) {
            if (shipmentDataStatus === 'IDLE') dispatch(fetchShipments({ companyId }));
        }
    }, [dispatch, shipmentDataStatus, companyId]);


    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <PackingList/> }
        </>
    )
});

export default PackingListContainer;