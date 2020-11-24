import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectHomeError, selectHomeStatus } from './duck/selectors.js';
import { determineStatus } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import Home from './Home.js';
import { fetchCompanyById } from './duck/thunks.js';
import { selectCurrentUserCompanyId } from '../../app/duck/selectors.js';

const HomeContainer = React.memo(function HomeContainer() {
    const dispatch = useDispatch();
    const homeStatus = useSelector(selectHomeStatus);
    const homeError = useSelector(selectHomeError);

    const status = determineStatus([homeStatus]);
    const errors = [homeError];

    const companyId = useSelector(selectCurrentUserCompanyId);

    useEffect(() => {
        dispatch(fetchCompanyById({ companyId }));
    }, [dispatch, companyId]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <Home/> }
        </>
    )
});

export default HomeContainer;