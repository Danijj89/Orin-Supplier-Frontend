import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Home from './Home.js';
import { selectSessionUserCompanyId } from 'app/duck/selectors.js';
import { Redirect, useHistory } from 'react-router-dom';

const HomeContainer = React.memo(function HomeContainer() {
    const history = useHistory();
    const companyId = useSelector(selectSessionUserCompanyId);

    useEffect(() => {
        if (!companyId) history.push('/login');
    }, [history, companyId]);

    if (companyId) return <Home />;
    else return <Redirect to={ '/login' }/>;
});

export default HomeContainer;