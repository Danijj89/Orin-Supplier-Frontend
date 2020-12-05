import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLeadById, selectLeadDataStatus, selectLeadError } from './duck/selectors.js';
import { selectCompanyId, selectHomeDataStatus, selectHomeError } from '../home/duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import Lead from './Lead.js';
import { fetchLeads } from './duck/thunks.js';
import { cleanHomeState } from '../home/duck/slice.js';
import { cleanLeadState } from './duck/slice.js';
import { selectUserDataStatus, selectUserError } from '../users/duck/selectors.js';
import { fetchUsers } from '../users/duck/thunks.js';
import { cleanUserState } from '../users/duck/slice.js';
import { useParams, Redirect } from 'react-router-dom';

const LeadContainer = React.memo(function LeadContainer() {
    const dispatch = useDispatch();
    const { id: leadId } = useParams();

    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);
    const leadDataStatus = useSelector(selectLeadDataStatus);
    const leadError = useSelector(selectLeadError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);

    const status = determineStatus(leadDataStatus, homeDataStatus, userDataStatus);
    const errors = getErrors(leadError, homeError, userError);

    const companyId = useSelector(selectCompanyId);
    const lead = useSelector(state => selectLeadById(state, { leadId }));
    const leadExists = useMemo(() => Boolean(lead) && leadDataStatus === 'FULFILLED', [leadDataStatus, lead]);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current && companyId) {
            if (leadDataStatus === 'IDLE') dispatch(fetchLeads({ companyId }));
            dispatch(fetchUsers({ companyId }));
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
            { !leadExists && <Redirect to={ '/home/leads' }/> }
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { leadExists && status === 'FULFILLED' && <Lead/> }
        </>
    );
});

export default LeadContainer;