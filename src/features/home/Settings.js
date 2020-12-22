import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { LANGUAGE } from 'app/utils/constants.js';
import AccountDetails from '../users/AccountDetails.js';
import CompanyDetails from './CompanyDetails.js';
import CompanyUsers from '../users/CompanyUsers.js';
import NavTabs from '../shared/components/NavTabs.js';
import queryString from 'query-string';

const { tabsLabelsMap } = LANGUAGE.home.settings;

const Settings = React.memo(function Settings() {
    const history = useHistory();
    const location = useLocation();
    const { tab } = queryString.parse(location.search);
    const tabValue = tab || 'account';

    const onTabChange = (newValue) =>
        history.push(`${location.pathname}?tab=${newValue}`);

    return (
        <Container>
            <NavTabs
                tabsLabelsMap={ tabsLabelsMap }
                tabValue={ tabValue }
                onChange={ onTabChange }
            />
            { tabValue === 'account' && <AccountDetails /> }
            { tabValue === 'colleagues' && <CompanyUsers /> }
            { tabValue === 'company' && <CompanyDetails /> }
        </Container>
    )
});

export default Settings;