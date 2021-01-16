import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLeadDataStatus, selectLeadError } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import { cleanLeadState } from './duck/slice.js';
import LeadOverview from './LeadOverview.js';
import { fetchLeads } from './duck/thunks.js';
import { selectUserDataStatus, selectUserError } from 'features/home/duck/users/selectors.js';
import { fetchUsers } from 'features/home/duck/users/thunks.js';
import { cleanUserState } from 'features/home/duck/users/slice.js';
import { READ_ANY, READ_OWN } from '../admin/utils/actions.js';
import LeadPermission from '../shared/permissions/LeadPermission.js';
import StatusHandler from 'features/shared/status/StatusHandler.js';
import { selectLeadStatus } from 'features/leads/duck/selectors.js';

const LeadOverviewContainer = React.memo(function LeadOverviewContainer() {
    const dispatch = useDispatch();

    const leadDataStatus = useSelector(selectLeadDataStatus);
    const leadError = useSelector(selectLeadError);
    const userDataStatus = useSelector(selectUserDataStatus);
    const userError = useSelector(selectUserError);

    const status = determineStatus(leadDataStatus, userDataStatus);
    const errors = getErrors(leadError, userError);

    const leadStatus = useSelector(selectLeadStatus);

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
        <LeadPermission action={ [READ_ANY, READ_OWN] }>
            <StatusHandler status={ leadStatus } error={ leadError }/>
            { status === 'REJECTED' && <ErrorPage error={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <LeadOverview/> }
        </LeadPermission>
    )
});

export default LeadOverviewContainer;