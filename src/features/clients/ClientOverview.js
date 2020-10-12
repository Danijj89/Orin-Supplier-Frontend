import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllClients, selectStatus as selectClientStatus } from './duck/selectors.js';
import { fetchClients } from './duck/thunks.js';
import { selectCurrentUserId, } from '../../app/duck/selectors.js';
import ClientsTable from './ClientsTable.js';
import NewClientButton from './NewClientButton.js';
import Loader from '../shared/displays/Loader.js';
import { selectUserById } from '../users/duck/selectors.js';
import { selectCurrentCompany } from '../home/duck/selectors.js';

export default function ClientOverview() {
    const dispatch = useDispatch();
    const userId = useSelector(selectCurrentUserId);
    const user = useSelector(state => selectUserById(userId));
    const clients = useSelector(selectAllClients);
    const company = useSelector(selectCurrentCompany);
    const clientStatus = useSelector(selectClientStatus);
    const loading = !Array.isArray(clients) || !company;

    useEffect(() => {
        if (clientStatus === 'IDLE') {
            dispatch(fetchClients(user.company));
        }
    }, [dispatch, user.company, clientStatus]);

    return (
        <Grid container>
            { loading && <Loader/> }
            { !loading &&
            <>
                <Grid container item justify="flex-end" xs={ 12 }>
                    <NewClientButton
                        userId={ user._id }
                        companyId={ user.company }
                        users={ company.users }
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <ClientsTable clients={ clients }/>
                </Grid>
            </>
            }
        </Grid>
    )
}