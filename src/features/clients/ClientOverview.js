import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import ClientFormButton from './ClientFormButton.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllClients, selectStatus } from './duck/selectors.js';
import { fetchClients } from './duck/thunks.js';
import { selectAutocompleteOptions, selectCurrentUser } from '../home/duck/selectors.js';
import ClientsTable from './ClientsTable.js';

export default function ClientOverview() {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const clients = useSelector(selectAllClients);
    const autocomplete = useSelector(selectAutocompleteOptions);
    const status = useSelector(selectStatus);

    useEffect(() => {
        if (status === 'IDLE' && !clients?.length) {
            dispatch(fetchClients(user.company));
        }
    }, [dispatch, user.company, status, clients.length]);

    return (
        <Grid container>
            <Grid container item justify="flex-end" xs={ 12 }>
                { autocomplete &&
                <ClientFormButton
                    userId={ user._id }
                    companyId={ user.company }
                    users={ autocomplete.users }
                /> }
            </Grid>
            <Grid item xs={ 12 }>
                {clients && <ClientsTable clients={clients}/>}
            </Grid>
        </Grid>
    )
}