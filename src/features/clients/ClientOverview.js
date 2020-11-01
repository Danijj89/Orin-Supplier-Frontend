import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllClients, selectClientDataStatus } from './duck/selectors.js';
import { fetchClients } from './duck/thunks.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import ClientsTable from './ClientsTable.js';
import NewClientButton from './NewClientButton.js';
import { selectAllUsers, selectUserStatus } from '../users/duck/selectors.js';
import {
    selectCurrentCompany,
    selectHomeStatus,
} from '../home/duck/selectors.js';
import { determineStatus, isLoading } from '../shared/utils/state.js';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../shared/components/Loader.js';

const useStyles = makeStyles((theme) => ({
    clientOverviewRoot: {
        margin: theme.spacing(2),
    }
}));

export default function ClientOverview() {
    const dispatch = useDispatch();
    const userId = useSelector(selectCurrentUserId);
    const company = useSelector(selectCurrentCompany);
    const users = useSelector(selectAllUsers);
    const clients = useSelector(selectAllClients);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const homeStatus = useSelector(selectHomeStatus);
    const userStatus = useSelector(selectUserStatus);
    const status = determineStatus([clientDataStatus, homeStatus, userStatus]);
    const loading = isLoading([clientDataStatus, homeStatus, userStatus]);
    const classes = useStyles();

    useEffect(() => {
        if (company) dispatch(fetchClients(company._id));
    }, [dispatch, company]);

    return (
        <>
            { status === 'PENDING' && <Loader /> }
            { status === 'FULFILLED' &&
            <Paper className={ classes.clientOverviewRoot }>
                <NewClientButton
                    userId={ userId }
                    companyId={ company._id }
                    users={ users }
                    className={ classes.newClientButton }
                />
                <ClientsTable clients={ clients } isLoading={ loading }/>
            </Paper> }
        </>
    );
}
