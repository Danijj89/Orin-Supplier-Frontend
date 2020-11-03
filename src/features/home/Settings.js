import React from 'react';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { Container, Tab, Tabs } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import AccountDetails from '../users/AccountDetails.js';
import CompanyDetails from './CompanyDetails.js';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import CompanyUsers from '../users/CompanyUsers.js';
import { selectAllUsers, selectUserById } from '../users/duck/selectors.js';
import { selectCurrentCompany } from './duck/selectors.js';

const { tabsLabelMap } = LANGUAGE.home.settings;

export default function Settings() {
    const { tab } = useParams();
    const history = useHistory();
    const tabs = Object.keys(tabsLabelMap);
    const company = useSelector(selectCurrentCompany);
    const userId = useSelector(selectCurrentUserId);
    const user = useSelector(state => selectUserById(state, userId));
    const users = useSelector(selectAllUsers);

    const onTabChange = (e, newValue) =>
        history.push(`/home/settings/${ newValue }`);

    return (
        <Container>
            <Redirect to={ '/home/settings/account' }/>
            <Tabs
                value={ tab }
                onChange={ onTabChange }
                indicatorColor='primary'
                textColor='primary'
            >
                { tabs.map(tab => <Tab key={ tab } label={ tab } value={ tab } component="span"/>) }
            </Tabs>
            { user && tab === tabs[0] && <AccountDetails user={ user }/> }
            { users && tab === tabs[1] && <CompanyUsers users={ users }/> }
            { company && tab === tabs[2] && <CompanyDetails company={ company }/> }
        </Container>
    )
}