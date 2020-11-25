import React from 'react';
import { Paper } from '@material-ui/core';
import ClientsTable from './ClientsTable.js';
import NewClientButton from './NewClientButton.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(2),
    }
}));

export default function ClientOverview() {
    const classes = useStyles();

    return (
        <Paper className={ classes.container }>
            <NewClientButton/>
            <ClientsTable/>
        </Paper>
    );
}
