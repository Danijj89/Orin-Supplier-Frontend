import React, { useEffect } from 'react';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectClientById } from './duck/selectors.js';
import { Container } from '@material-ui/core';
import { fetchClientById } from './duck/thunks.js';
import Loader from '../shared/displays/Loader.js';
import ColumnInfoDisplay from '../shared/wrappers/ColumnInfoDisplay.js';
import { LANGUAGE } from '../../constants.js';
import ClientInfoTable from './ClientInfoTable.js';
import EditClientButton from './EditClientButton.js';
import { selectCurrentCompany } from '../../app/duck/selectors.js';
import { dateToLocaleDate } from '../shared/utils/format.js';

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
    const company = useSelector(selectCurrentCompany);
    const loading = !client || !company;

    const leftLabels = [assignedToLabel, primaryContactLabel, contactEmailLabel, taxNumberLabel];
    const rightLabels = [sourceLabel, incotermLabel, paymentLabel, clientSinceLabel];
    const leftData = [
        client?.assignedTo.name,
        client?.defaultContact?.name,
        client?.defaultContact?.email,
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
            { loading && <Loader/> }
            { !loading &&
            <InfoCard
                title={ client.name }
                button={
                    <EditClientButton
                        client={ client }
                        users={ company.users }
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
            { !loading && <ClientInfoTable client={ client }/> }
        </Container>
    )
}