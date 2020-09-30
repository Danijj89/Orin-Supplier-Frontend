import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import ClientFormButton from './ClientFormButton.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllClients, selectError, selectStatus } from './duck/selectors.js';
import { fetchClients } from './duck/thunks.js';
import { selectCurrentUser } from '../home/duck/selectors.js';

export default function ClientOverview() {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const clients = useSelector(selectAllClients);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);

    useEffect(() => {
        if (status === 'IDLE' && !clients?.length) {
            dispatch(fetchClients(user.company._id));
        }
    }, [dispatch, user.company._id, status, clients.length]);

    return (
        <Grid container>
            <Grid container item justify="flex-end" xs={12}>
                <ClientFormButton userId={user._id} companyId={user.company._id}/>
            </Grid>
            <Grid item xs={12}>
            </Grid>
        </Grid>
    )
}