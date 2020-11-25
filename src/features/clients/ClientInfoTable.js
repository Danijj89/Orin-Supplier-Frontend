import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { LANGUAGE } from '../../app/utils/constants.js';
import ClientContactsTable from './ClientContactsTable.js';
import ClientOrdersTable from './ClientOrdersTable.js';
import ClientAddressCards from './ClientAddressCards.js';
import NavTabs from '../shared/components/NavTabs.js';

const { tabsLabelsMap } = LANGUAGE.client.clientDetails;

const ClientInfoTable = React.memo(function ClientInfoTable(
    {
        clientId,
        clientName,
        clientAddresses,
        clientDefaultAddress,
        clientContacts,
        clientDefaultContact,
        clientOrders
    }) {
    const [tabValue, setTabValue] = useState('addresses');

    return (
        <Paper>
            <NavTabs
                tabsLabelsMap={ tabsLabelsMap }
                tabValue={ tabValue }
                onChange={ setTabValue }
            />
            { tabValue === 'addresses' &&
            <ClientAddressCards
                clientId={ clientId }
                clientName={ clientName }
                clientAddresses={ clientAddresses }
                clientDefaultAddress={ clientDefaultAddress }
            /> }
            { tabValue === 'contacts' &&
            <ClientContactsTable
                clientId={ clientId }
                clientContacts={ clientContacts }
                clientDefaultContact={ clientDefaultContact }
            /> }
            { tabValue === 'orders' &&
            <ClientOrdersTable
                clientOrders={ clientOrders }
            /> }
        </Paper>
    )
});

export default ClientInfoTable;