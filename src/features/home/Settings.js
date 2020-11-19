import React, { useState } from 'react';
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
    const location = useLocation();
    const { tab } = queryString.parse(location.search);
    const company = useSelector(selectCurrentCompany);
    const userId = useSelector(selectCurrentUserId);
    const [tabValue, setTabValue] = useState(tab || 'account');
    const user = useSelector(state => selectUserById(state, userId));
    const users = useSelector(selectAllUsers);

    return (
        <Container>
            <NavTabs
                tabsLabelsMap={ tabsLabelsMap }
                tabValue={ tabValue }
                onChange={ setTabValue }
            />
            { tabValue === 'account' && <AccountDetails user={ user }/> }
            { tabValue === 'colleagues' && <CompanyUsers users={ users }/> }
            { tabValue === 'company' && <CompanyDetails company={ company }/> }
        </Container>
    )
}