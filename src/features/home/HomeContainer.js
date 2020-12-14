import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Home.js';
import { selectAccessControl, selectCurrentUserCompanyId } from '../../app/duck/selectors.js';
import { Redirect } from 'react-router-dom';
import { setAccessControl } from '../../app/duck/slice.js';

const HomeContainer = React.memo(function HomeContainer() {
    const dispatch = useDispatch();

    const companyId = useSelector(selectCurrentUserCompanyId);
    const ac = useSelector(selectAccessControl);

    useEffect(() => {
        dispatch(setAccessControl());
    }, [dispatch]);

    return (
        <>
            { !companyId && <Redirect to={ '/login' }/> }
            { companyId && ac && <Home/> }
        </>
    )
});

export default HomeContainer;