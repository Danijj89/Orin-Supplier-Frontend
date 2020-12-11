import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectHomeError, selectHomeDataStatus } from './duck/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import Home from './Home.js';
import { fetchCurrentCompany } from './duck/thunks.js';
import { selectCurrentUserCompanyId } from '../../app/duck/selectors.js';
import { Redirect } from 'react-router-dom';

const HomeContainer = React.memo(function HomeContainer() {
    const dispatch = useDispatch();
    const homeDataStatus = useSelector(selectHomeDataStatus);
    const homeError = useSelector(selectHomeError);

    const status = determineStatus(homeDataStatus);
    const errors = getErrors(homeError);

    const companyId = useSelector(selectCurrentUserCompanyId);

    useEffect(() => {
        if ((homeDataStatus === 'REJECTED' || homeDataStatus === 'IDLE') && companyId) {
            dispatch(fetchCurrentCompany({ companyId }));
        }
    }, [dispatch, companyId, homeDataStatus]);

    return (
        <>
            { !companyId && <Redirect to={ '/login' }/> }
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { companyId && status === 'FULFILLED' && <Home/> }
        </>
    )
});

export default HomeContainer;