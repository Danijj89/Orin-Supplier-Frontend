import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLeadDataStatus, selectLeadError } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { selectCompanyId, selectHomeDataStatus, selectHomeError } from '../home/duck/selectors.js';
import { cleanHomeState } from '../home/duck/slice.js';
import { cleanLeadState } from './duck/slice.js';
import LeadOverview from './LeadOverview.js';
import { fetchLeads } from './duck/thunks.js';

const LeadOverviewContainer = React.memo(function LeadOverviewContainer() {
    const dispatch = useDispatch();

    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const leadDataStatus = useSelector(selectLeadDataStatus);
    const leadError = useSelector(selectLeadError);

    const status = determineStatus(homeDataStatus, leadDataStatus);
    const errors = getErrors(homeError, leadError);

    const companyId = useSelector(selectCompanyId);

    useEffect(() => {
        if (leadDataStatus === 'IDLE' && companyId)
            dispatch(fetchLeads({ companyId }));
    }, [dispatch, companyId, leadDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeState());
                dispatch(cleanLeadState());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <LeadOverview/> }
        </>
    )
});

export default LeadOverviewContainer;