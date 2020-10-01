import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Tab, Tabs } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import AccountDetails from './AccountDetails.js';
import CompanyDetails from './CompanyDetails.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersByCompanyId } from './duck/thunks.js';
import { selectCompanyUsers, selectCurrentCompany, selectCurrentUser, selectStatus } from './duck/selectors.js';
import CompanyUsers from './CompanyUsers.js';

const { tabsLabelMap } = LANGUAGE.home.settings;

export default function Settings({ match }) {
    const dispatch = useDispatch();
    const { tab } = match.params;
    const history = useHistory();
    const tabs = Object.keys(tabsLabelMap);
    const [tabValue, setTabValue] = useState(tab || 'account');
    const status = useSelector(selectStatus);
    const company = useSelector(selectCurrentCompany);
    const user = useSelector(selectCurrentUser);
    const users = useSelector(selectCompanyUsers);

    const onTabChange = (e, newValue) => {
        setTabValue(newValue);
        history.push(`/home/settings/${newValue}`);
    };

    useEffect(() => {
        if (status === 'IDLE' && !users?.length) {
            dispatch(fetchUsersByCompanyId(user.company))
        }
    }, [dispatch, status, users, user.company]);

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
            { tabValue === tabs[0] && <AccountDetails user={user}/> }
            { users && tabValue === tabs[1] && <CompanyUsers users={users}/> }
            { company && tabValue === tabs[2] && <CompanyDetails company={company}/>}
        </Container>
    )
}