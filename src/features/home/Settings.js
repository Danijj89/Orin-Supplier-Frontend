import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Tab, Tabs } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import AccountDetails from './AccountDetails.js';
import CompanyDetails from './CompanyDetails.js';
import { useSelector } from 'react-redux';
import { selectCurrentCompany, selectCurrentUser } from './duck/selectors.js';
import CompanyUsers from './CompanyUsers.js';

const { tabsLabelMap } = LANGUAGE.home.settings;

export default function Settings({ match }) {
    const { tab } = match.params;
    const history = useHistory();
    const tabs = Object.keys(tabsLabelMap);
    const [tabValue, setTabValue] = useState(tab || 'account');
    const company = useSelector(selectCurrentCompany);
    const user = useSelector(selectCurrentUser);

    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
        history.push(`/home/settings/${ newValue }`);
    };

    return (
        <Container>
            <Tabs
                value={ tabValue }
                onChange={ onTabChange }
                indicatorColor='primary'
                textColor='primary'
            >
                { tabs.map(tab => <Tab key={ tab } label={ tab } value={ tab } component="span"/>) }
            </Tabs>
            { tabValue === tabs[0] && <AccountDetails user={ user }/> }
            { company && tabValue === tabs[1] && <CompanyUsers users={ company.users }/> }
            { company && tabValue === tabs[2] && <CompanyDetails company={ company }/> }
        </Container>
    )
}