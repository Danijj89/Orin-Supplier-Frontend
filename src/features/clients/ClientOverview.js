import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllClients, selectClientStatus } from './duck/selectors.js';
import { fetchClients } from './duck/thunks.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import ClientsTable from './ClientsTable.js';
import NewClientButton from './NewClientButton.js';
import { selectAllUsers, selectUserStatus } from '../users/duck/selectors.js';
import {
    selectCurrentCompany,
    selectHomeStatus,
} from '../home/duck/selectors.js';
import { isLoading } from '../shared/utils/state.js';
import { cleanClientStore } from './duck/slice.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    clientOverviewRoot: {
        margin: theme.spacing(2),
    },

}));

export default function ClientOverview() {
    const dispatch = useDispatch();
    const userId = useSelector(selectCurrentUserId);
    const company = useSelector(selectCurrentCompany);
    const users = useSelector(selectAllUsers);
    const clients = useSelector(selectAllClients);
    const clientStatus = useSelector(selectClientStatus);
    const homeStatus = useSelector(selectHomeStatus);
    const userStatus = useSelector(selectUserStatus);
    const loading = isLoading([clientStatus, homeStatus, userStatus]);
    const classes = useStyles();

    useEffect(() => {
        if (company) dispatch(fetchClients(company._id));
        return () => dispatch(cleanClientStore());
    }, [dispatch, company]);

    return (
            <Paper className={classes.clientOverviewRoot}>
            
            {userId && company && users && (
                    <NewClientButton
                        userId={userId}
                        companyId={company._id}
                        users={users}
                        className={classes.newClientButton}
                    />
            )}
            {clients && (
                    <ClientsTable clients={clients} isLoading={loading}  />
            )}
        </Paper>
    );
}
