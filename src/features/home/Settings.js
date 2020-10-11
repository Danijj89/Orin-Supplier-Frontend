import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Tab, Tabs } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import AccountDetails from './AccountDetails.js';
import CompanyDetails from './CompanyDetails.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCompany, selectCurrentUser } from '../../app/duck/selectors.js';
import CompanyUsers from './CompanyUsers.js';
import { fetchUsers } from '../users/duck/thunks.js';
import { selectAllUsers } from '../users/duck/selectors.js';

const { tabsLabelMap } = LANGUAGE.home.settings;

export default function Settings({ match }) {
    const { tab } = match.params;
    const history = useHistory();
    const dispatch = useDispatch();
    const tabs = Object.keys(tabsLabelMap);
    const company = useSelector(selectCurrentCompany);
    const user = useSelector(selectCurrentUser);
    const users = useSelector(selectAllUsers)

    const onTabChange = (e, newValue) =>
        history.push(`/home/settings/${ newValue }`);

    useEffect(() => {
        dispatch(fetchUsers(company._id));
    }, [dispatch]);

    return (
        <Container>
            <Tabs
                value={ tab }
                onChange={ onTabChange }
                indicatorColor='primary'
                textColor='primary'
            >
                { tabs.map(tab => <Tab key={ tab } label={ tab } value={ tab } component="span"/>) }
            </Tabs>
            { tab === tabs[0] && <AccountDetails user={ user }/> }
            { company && tab === tabs[1] && <CompanyUsers users={ users}/> }
            { company && tab === tabs[2] && <CompanyDetails company={ company }/> }
        </Container>
    )
}