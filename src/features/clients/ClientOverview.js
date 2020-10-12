import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllClients, selectClientStatus } from './duck/selectors.js';
import { fetchClients } from './duck/thunks.js';
import { selectCurrentUserId, } from '../../app/duck/selectors.js';
import ClientsTable from './ClientsTable.js';
import NewClientButton from './NewClientButton.js';
import Loader from '../shared/components/Loader.js';
import { selectAllUsers, selectUserStatus } from '../users/duck/selectors.js';
import { selectCurrentCompany, selectHomeStatus } from '../home/duck/selectors.js';
import { isLoading } from '../shared/utils/store.js';
import { cleanClientStore } from './duck/slice.js';

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

    useEffect(() => {
        if (company) dispatch(fetchClients(company._id));
        return () => dispatch(cleanClientStore());
    }, [dispatch, company]);

    return (
        <Grid container>
            { loading && <Loader/> }
            { userId && company && users &&
            <Grid container item justify="flex-end" xs={ 12 }>
                <NewClientButton
                    userId={ userId }
                    companyId={ company._id }
                    users={ users }
                />
            </Grid>
            }
            { clients &&
            <Grid item xs={ 12 }>
                <ClientsTable clients={ clients }/>
            </Grid>
            }
        </Grid>
    )
}