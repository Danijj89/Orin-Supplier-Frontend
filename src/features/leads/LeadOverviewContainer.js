import React, { useEffect, useRef } from 'react';
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
import { selectUserDataStatus, selectUserError } from '../users/duck/selectors.js';
import { fetchUsers } from '../users/duck/thunks.js';
import { cleanUserState } from '../users/duck/slice.js';

const LeadOverviewContainer = React.memo(function LeadOverviewContainer() {
    const dispatch = useDispatch();

    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const leadDataStatus = useSelector(selectLeadDataStatus);
    const leadError = useSelector(selectLeadError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);

    const status = determineStatus(homeDataStatus, leadDataStatus, userDataStatus);
    const errors = getErrors(homeError, leadError, userError);

    const companyId = useSelector(selectCompanyId);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current && companyId) {
            if (leadDataStatus === 'IDLE') dispatch(fetchLeads({ companyId }));
            dispatch(fetchUsers({companyId}));
            fetched.current = true;
        }
    }, [dispatch, companyId, leadDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanHomeState());
                dispatch(cleanLeadState());
                dispatch(cleanUserState());
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