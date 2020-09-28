import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Tab, Tabs } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import AccountSettingsTab from './AccountSettingsTab.js';
import CompanySettingsTab from './CompanySettingsTab.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompany } from './duck/thunks.js';
import { selectCurrentCompany, selectCurrentUser, selectStatus } from './duck/selectors.js';

const { tabsLabelMap } = LANGUAGE.home.settings;

export default function Settings({ match }) {
    const dispatch = useDispatch();
    const { tab } = match.params;
    const history = useHistory();
    const tabs = Object.keys(tabsLabelMap);
    const [tabValue, setTabValue] = useState(tab);
    const status = useSelector(selectStatus);
    const company = useSelector(selectCurrentCompany);
    const user = useSelector(selectCurrentUser);

    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
        history.push(`/home/settings/${newValue}`);
    };

    useEffect(() => {
        if (company === null && status !== 'FULFILLED') {
            dispatch(fetchCompany(user.company._id));
        }
    }, [dispatch, company, status, user.company._id]);

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
            { tabValue === tabs[0] && <AccountSettingsTab user={user}/> }
            { company && tabValue === tabs[2] && <CompanySettingsTab company={company}/>}
        </Container>

    )
}