import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import AccountDetails from '../users/AccountDetails.js';
import CompanyDetails from './CompanyDetails.js';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import CompanyUsers from '../users/CompanyUsers.js';
import { selectAllUsers, selectUserById } from '../users/duck/selectors.js';
import { selectCurrentCompany } from './duck/selectors.js';
import NavTabs from '../shared/components/NavTabs.js';
import queryString from 'query-string';

const { tabsLabelsMap } = LANGUAGE.home.settings;

export default function Settings() {
    const history = useHistory();
    const location = useLocation();
    const { tab } = queryString.parse(location.search);
    const tabValue = tab || 'account';
    const company = useSelector(selectCurrentCompany);

    const users = useSelector(selectAllUsers);

    const onTabChange = (newValue) =>
        history.push(`/home/settings?tab=${newValue}`);

    return (
        <Container>
            <NavTabs
                tabsLabelsMap={ tabsLabelsMap }
                tabValue={ tabValue }
                onChange={ onTabChange }
            />
            { tabValue === 'account' && <AccountDetails /> }
            { tabValue === 'colleagues' && <CompanyUsers users={ users }/> }
            { tabValue === 'company' && <CompanyDetails company={ company }/> }
        </Container>
    )
}