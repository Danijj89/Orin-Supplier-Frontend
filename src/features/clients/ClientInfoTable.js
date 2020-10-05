import React, { useState } from 'react';
import { Paper, Tab, Tabs, Box } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import ClientAddressesTable from './ClientAddressesTable.js';
import { makeStyles } from '@material-ui/core/styles';
import ClientContactsTable from './ClientContactsTable.js';
import ClientOrdersTable from './ClientOrdersTable.js';

const useStyles = makeStyles((theme) => ({
    table: {
        minHeight: 300
    }
}));

const { tabsLabelsMap } = LANGUAGE.client.clientDetails;

export default function ClientInfoTable({ client }) {
    const classes = useStyles();
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
            { client && tabValue === 'addresses' &&
            <Box className={ classes.table }>
                <ClientAddressesTable addresses={ client.addresses }/>
            </Box> }
            { client && tabValue === 'contacts' && <ClientContactsTable contacts={ client.contacts }/> }
            { client && tabValue === 'orders' && <ClientOrdersTable orders={ client.orders }/> }
        </Paper>
    )
}