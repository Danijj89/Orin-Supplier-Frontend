import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Tab, Tabs } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import AccountSettingsTab from './AccountSettingsTab.js';
import CompanySettingsTab from './CompanySettingsTab.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompany, fetchUsersByCompanyId } from './duck/thunks.js';
import { selectCompanyUsers, selectCurrentCompany, selectCurrentUser, selectStatus } from './duck/selectors.js';
import CompanyUsersSettingsTab from './CompanyUsersSettingsTab.js';

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
    const users = useSelector(selectCompanyUsers);

    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
        history.push(`/home/settings/${newValue}`);
    };

    useEffect(() => {
        if (status === 'IDLE') {
            if (company === null) dispatch(fetchCompany(user.company._id));
            if (!users?.length) dispatch(fetchUsersByCompanyId(user.company._id));
        }
    }, [dispatch, company, status, users, user.company._id]);

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
            { users && tabValue === tabs[1] && <CompanyUsersSettingsTab users={users}/> }
            { company && tabValue === tabs[2] && <CompanySettingsTab company={company}/>}
        </Container>
    )
}