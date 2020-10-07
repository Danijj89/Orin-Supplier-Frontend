import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllClients, selectStatus as selectClientStatus } from './duck/selectors.js';
import { fetchClients } from './duck/thunks.js';
import { selectAutocompleteOptions, selectCurrentUser, selectStatus as selectHomeStatus } from '../home/duck/selectors.js';
import ClientsTable from './ClientsTable.js';
import NewClientButton from './NewClientButton.js';
import Loader from '../shared/displays/Loader.js';

export default function ClientOverview() {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const clients = useSelector(selectAllClients);
    const autocomplete = useSelector(selectAutocompleteOptions);
    const clientStatus = useSelector(selectClientStatus);
    const homeStatus = useSelector(selectHomeStatus);
    const loading = homeStatus === 'PENDING' || clientStatus === 'PENDING';

    useEffect(() => {
        if (clientStatus === 'IDLE') {
            dispatch(fetchClients(user.company));
        }
    }, [dispatch, user.company, clientStatus]);

    return (
        <Grid container>
            {loading && <Loader />}
            {!loading && <>
                <Grid container item justify="flex-end" xs={ 12 }>
                    { autocomplete &&
                    <NewClientButton
                        userId={ user._id }
                        companyId={ user.company }
                        users={ autocomplete.users }
                    /> }
                </Grid>
                <Grid item xs={ 12 }>
                    {clients && <ClientsTable clients={clients}/>}
                </Grid>
            </>}
        </Grid>
    )
}