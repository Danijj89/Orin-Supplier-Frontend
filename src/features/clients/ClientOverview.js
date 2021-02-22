import React, { useCallback } from 'react';
import { Paper } from '@material-ui/core';
import ClientsTable from './ClientsTable.js';
import NewClientButton from './NewClientButton.js';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SearchBar from 'features/shared/components/SearchBar.js';
import { useSelector } from 'react-redux';
import { selectAllActiveClients } from 'features/clients/duck/selectors.js';
import { getClientUrl } from 'features/clients/utils/urls.js';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(2),
    },
    topRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(2)
    }
}));

export default function ClientOverview() {
    const classes = useStyles();
    const clients = useSelector(selectAllActiveClients);

    const getOptionLabel = useCallback(
        client => {
            const defaultContact = client.contacts.find(contact => contact.default);
            return `${ client.name }${ defaultContact ? ` - ${ defaultContact.name }` : '' }`;
        }, []);

    const getUrl = useCallback(client => getClientUrl(client._id), []);

    return (
        <Paper className={ classes.container }>
            <Box className={ classes.topRow }>
                <NewClientButton/>
                <SearchBar
                    options={ clients }
                    getOptionLabel={ getOptionLabel }
                    getOptionSelected={ (client, value) => client._id === value._id }
                    getUrl={ getUrl }
                />
            </Box>
            <ClientsTable/>
        </Paper>
    );
}
