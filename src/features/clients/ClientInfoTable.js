import React from 'react';
import { useHistory } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { LANGUAGE } from '../../app/utils/constants.js';
import ClientAddressCards from './ClientAddressCards.js';
import NavTabs from '../shared/components/NavTabs.js';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import ClientContactsTable from './ClientContactsTable.js';

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
            { tabValue === 'contacts' &&
            <ClientContactsTable /> }
        </Paper>
    )
});

export default ClientInfoTable;


// { tabValue === 'orders' &&
// <ClientOrdersTable
//     clientOrders={ clientOrders }
// /> }