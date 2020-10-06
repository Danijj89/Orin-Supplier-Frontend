import React, { useEffect } from 'react';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectClientById, selectStatus } from './duck/selectors.js';
import { Container } from '@material-ui/core';
import { fetchClientById } from './duck/thunks.js';
import Loader from '../shared/displays/Loader.js';
import ColumnInfoDisplay from '../shared/wrappers/ColumnInfoDisplay.js';
import { LANGUAGE } from '../../constants.js';
import { dateToLocaleDate } from '../shared/utils.js';
import ClientInfoTable from './ClientInfoTable.js';

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
    const status = useSelector(selectStatus);
    const leftLabels = [assignedToLabel, primaryContactLabel, contactEmailLabel, taxNumberLabel];
    const rightLabels = [sourceLabel, incotermLabel, paymentLabel, clientSinceLabel];

    const leftData = [
        client?.assignedTo.name,
        client?.defaultContact.name,
        client?.defaultContact.email,
        client?.taxNumber
    ];
    const rightData = [
        client?.source,
        client?.incoterm,
        client?.payment,
        dateToLocaleDate(client?.clientSince)
    ];

    useEffect(() => {
        if (!client) dispatch(fetchClientById(id));
    }, [dispatch, id, client]);

    return (
        <Container>
            { status === 'PENDING' && <Loader/> }
            { client && <InfoCard
                title={ client.name }
                // button={ <ButtonDialog dialogTitle="hello its me" buttonLabel="edit"/> }
            >
                <ColumnInfoDisplay
                    leftLabels={ leftLabels }
                    rightLabels={ rightLabels }
                    leftData={ leftData }
                    rightData={ rightData }
                />
            </InfoCard> }
            { client && <ClientInfoTable client={ client }/> }
        </Container>
    )
}