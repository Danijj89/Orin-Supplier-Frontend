import React, { useState } from 'react';
import { Paper, Tab, Tabs } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import ClientAddressesTable from './ClientAddressesTable.js';
import ClientContactsTable from './ClientContactsTable.js';
import ClientOrdersTable from './ClientOrdersTable.js';

const { tabsLabelsMap } = LANGUAGE.client.clientDetails;

export default function ClientInfoTable({ client }) {
    const [tabValue, setTabValue] = useState('addresses');

    const onTabChange = (e, newTab) => setTabValue(newTab);

    return (
        <Paper>
            <Tabs
                value={ tabValue }
                onChange={ onTabChange }
                indicatorColor='primary'
                textColor='primary'
            >
                { Object.entries(tabsLabelsMap).map(([value, label]) =>
                    <Tab
                        key={ value }
                        label={ label }
                        value={ value }
                        component="span"
                    />) }
            </Tabs>
            { client && tabValue === 'addresses' && <ClientAddressesTable client={ client }/> }
            { client && tabValue === 'contacts' && <ClientContactsTable client={ client }/> }
            { client && tabValue === 'orders' && <ClientOrdersTable orders={ client.orders }/> }
        </Paper>
    )
}