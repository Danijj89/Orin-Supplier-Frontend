import React, { useEffect } from 'react';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectClientById, selectClientStatus } from './duck/selectors.js';
import { Container } from '@material-ui/core';
import { fetchClientById } from './duck/thunks.js';
import Loader from '../shared/components/Loader.js';
import ColumnInfoDisplay from '../shared/wrappers/ColumnInfoDisplay.js';
import { LANGUAGE } from '../../app/constants.js';
import ClientInfoTable from './ClientInfoTable.js';
import EditClientButton from './EditClientButton.js';
import { dateToLocaleDate } from '../shared/utils/format.js';
import { selectAllUsers, selectUserStatus } from '../users/duck/selectors.js';
import { isLoading } from '../shared/utils/store.js';
import { cleanClientStore } from './duck/slice.js';

const {
    assignedToLabel,
    primaryContactLabel,
    contactEmailLabel,
    taxNumberLabel,
    sourceLabel,
    incotermLabel,
    paymentLabel,
    clientSinceLabel
} = LANGUAGE.client.clientDetails;

export default function ClientDetails({ match }) {
    const dispatch = useDispatch();
    const { id } = match.params;
    const client = useSelector(state => selectClientById(state, id));
    const users = useSelector(selectAllUsers);
    const clientStatus = useSelector(selectClientStatus);
    const userStatus = useSelector(selectUserStatus);
    const loading = isLoading([clientStatus, userStatus]);

    const leftLabels = [assignedToLabel, primaryContactLabel, contactEmailLabel, taxNumberLabel];
    const rightLabels = [sourceLabel, incotermLabel, paymentLabel, clientSinceLabel];
    const leftData = client && [
        client.assignedTo.name,
        client.defaultContact?.name,
        client.defaultContact?.email,
        client.taxNumber
    ];
    const rightData = client && [
        client.source,
        client.incoterm,
        client.payment,
        dateToLocaleDate(client.clientSince)
    ];

    useEffect(() => {
        if (!client) dispatch(fetchClientById(id));
        return () => dispatch(cleanClientStore());
    }, [dispatch, id, client]);

    return (
        <Container>
            { loading && <Loader/> }
            { client && users &&
            <InfoCard
                title={ client.name }
                button={
                    <EditClientButton
                        client={ client }
                        users={ users }
                    />
                }
                content={
                    <ColumnInfoDisplay
                        leftLabels={ leftLabels }
                        rightLabels={ rightLabels }
                        leftData={ leftData }
                        rightData={ rightData }
                    />
                }
            /> }
            { client && <ClientInfoTable client={ client }/> }
        </Container>
    )
}