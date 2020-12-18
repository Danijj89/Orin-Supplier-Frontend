import React from 'react';
import { useSelector } from 'react-redux';
import Home from './Home.js';
import { selectSessionUserCompanyId } from '../../app/duck/selectors.js';
import { Redirect } from 'react-router-dom';

const HomeContainer = React.memo(function HomeContainer() {
    const companyId = useSelector(selectSessionUserCompanyId);

    if (companyId) return <Home />;
    else return <Redirect to={ '/login' }/>;
});

export default HomeContainer;