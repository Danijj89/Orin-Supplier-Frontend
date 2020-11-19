import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectClientDataStatus } from './duck/selectors.js';
import { fetchClients } from './duck/thunks.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import ClientsTable from './ClientsTable.js';
import NewClientButton from './NewClientButton.js';
import { selectAllUsers, selectUserStatus } from '../users/duck/selectors.js';
import {
    selectCompanyId,
    selectHomeStatus,
} from '../home/duck/selectors.js';
import { determineStatus } from '../shared/utils/state.js';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../shared/components/Loader.js';

const useStyles = makeStyles((theme) => ({
    clientOverviewRoot: {
        margin: theme.spacing(2),
    }
}));

export default function ClientOverview() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userId = useSelector(selectCurrentUserId);
    const companyId = useSelector(selectCompanyId);
    const users = useSelector(selectAllUsers);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const homeStatus = useSelector(selectHomeStatus);
    const userStatus = useSelector(selectUserStatus);
    const status = determineStatus([clientDataStatus, homeStatus, userStatus]);

    useEffect(() => {
        if (companyId) dispatch(fetchClients({companyId}));
    }, [dispatch, companyId]);

    return (
        <>
            { status === 'PENDING' && <Loader /> }
            { status === 'FULFILLED' &&
            <Paper className={ classes.clientOverviewRoot }>
                <NewClientButton
                    userId={ userId }
                    companyId={ companyId }
                    users={ users }
                />
                <ClientsTable />
            </Paper> }
        </>
    );
}
