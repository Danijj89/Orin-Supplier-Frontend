import React from 'react';
import { Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import ClientsTable from './ClientsTable.js';
import NewClientButton from './NewClientButton.js';
import { selectAllUsers } from '../users/duck/selectors.js';
import {
    selectCompanyId,
} from '../home/duck/selectors.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    clientOverviewRoot: {
        margin: theme.spacing(2),
    }
}));

export default function ClientOverview() {
    const classes = useStyles();
    const userId = useSelector(selectCurrentUserId);
    const companyId = useSelector(selectCompanyId);
    const users = useSelector(selectAllUsers);

    return (
        <Paper className={ classes.clientOverviewRoot }>
            <NewClientButton
                userId={ userId }
                companyId={ companyId }
                users={ users }
            />
            <ClientsTable/>
        </Paper>
    );
}
