import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Tab, Tabs } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import AccountSettingsTab from './AccountSettingsTab.js';
import CompanySettingsTab from './CompanySettingsTab.js';

const { tabsLabelMap } = LANGUAGE.home.settings;

export default function Settings({ match }) {
    const { tab } = match.params;
    const history = useHistory();
    const tabs = Object.keys(tabsLabelMap);
    const [tabValue, setTabValue] = useState(tab);

    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
        history.push(`/home/settings/${newValue}`);
    }

    return (
        <Container>
            <Tabs
                value={ tabValue }
                onChange={ onTabChange }
                indicatorColor='primary'
                textColor='primary'
            >
                {tabs.map(tab => <Tab key={tab} label={tab} value={tab} component="span" />)}
            </Tabs>
            { tabValue === tabs[0] && <AccountSettingsTab /> }
            { tabValue === tabs[2] && <CompanySettingsTab />}
        </Container>

    )
}