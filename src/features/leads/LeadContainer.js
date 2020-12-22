import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLeadById, selectLeadDataStatus, selectLeadError } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import Lead from './Lead.js';
import { fetchLeads } from './duck/thunks.js';
import { cleanLeadState } from './duck/slice.js';
import { selectUserDataStatus, selectUserError } from 'features/home/duck/users/selectors.js';
import { fetchUsers } from 'features/home/duck/users/thunks.js';
import { cleanUserState } from 'features/home/duck/users/slice.js';
import { useParams, Redirect } from 'react-router-dom';
import { READ_ANY, READ_OWN } from '../admin/utils/actions.js';
import LeadPermission from '../shared/permissions/LeadPermission.js';

const LeadContainer = React.memo(function LeadContainer() {
    const dispatch = useDispatch();
    const { id: leadId } = useParams();

    const leadDataStatus = useSelector(selectLeadDataStatus);
    const leadError = useSelector(selectLeadError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);

    const status = determineStatus(leadDataStatus, userDataStatus);
    const errors = getErrors(leadError, userError);

    const lead = useSelector(state => selectLeadById(state, { leadId }));
    const leadExists = useMemo(() => Boolean(lead) && leadDataStatus === 'FULFILLED', [leadDataStatus, lead]);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            if (leadDataStatus === 'IDLE') dispatch(fetchLeads());
            if (userDataStatus === 'IDLE') dispatch(fetchUsers());
            fetched.current = true;
        }
    }, [dispatch, leadDataStatus, userDataStatus]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanLeadState());
                dispatch(cleanUserState());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <LeadPermission action={ [READ_ANY, READ_OWN] } leadId={ leadId }>
            { !leadExists && <Redirect to={ '/home/leads' }/> }
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { leadExists && status === 'FULFILLED' && <Lead/> }
        </LeadPermission>
    );
});

export default LeadContainer;