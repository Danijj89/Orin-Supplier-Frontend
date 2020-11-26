import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { LANGUAGE } from '../../app/utils/constants.js';
import ClientContactsTable from './ClientContactsTable.js';
import ClientOrdersTable from './ClientOrdersTable.js';
import ClientAddressCards from './ClientAddressCards.js';
import NavTabs from '../shared/components/NavTabs.js';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectClientById } from './duck/selectors.js';
import queryString from 'query-string';
import { useHistory } from 'react-router';

const { tabsLabelsMap } = LANGUAGE.client.clientDetails;

const ClientInfoTable = React.memo(function ClientInfoTable() {
    const history = useHistory();
    const location = useLocation();
    const { tab } = queryString.parse(location.search);
    const tabValue = tab || 'addresses';

    const setTabValue = (newValue) =>
        history.push(`${location.pathname}?tab=${newValue}`);

    return (
        <Paper>
            <NavTabs
                tabsLabelsMap={ tabsLabelsMap }
                tabValue={ tabValue }
                onChange={ setTabValue }
            />
            { tabValue === 'addresses' &&
            <ClientAddressCards /> }
        </Paper>
    )
});

export default ClientInfoTable;

// { tabValue === 'contacts' &&
// <ClientContactsTable
//     clientId={ clientId }
//     clientContacts={ clientContacts }
//     clientDefaultContact={ clientDefaultContact }
// /> }
// { tabValue === 'orders' &&
// <ClientOrdersTable
//     clientOrders={ clientOrders }
// /> }