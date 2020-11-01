import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import ClientContactsTable from './ClientContactsTable.js';
import ClientOrdersTable from './ClientOrdersTable.js';
import ClientAddressCards from './ClientAddressCards.js';
import NavTabs from '../shared/components/NavTabs.js';

const { tabsLabelsMap } = LANGUAGE.client.clientDetails;

export default function ClientInfoTable({ client }) {
    const [tabValue, setTabValue] = useState('addresses');

    return (
        <Paper>
            <NavTabs
                tabsLabelsMap={tabsLabelsMap}
                tabValue={tabValue}
                onChange={setTabValue}
            />
            { client && tabValue === 'addresses' && <ClientAddressCards client={ client }/> }
            { client && tabValue === 'contacts' && <ClientContactsTable client={ client }/> }
            { client && tabValue === 'orders' && <ClientOrdersTable orders={ client.orders }/> }
        </Paper>
    )
}