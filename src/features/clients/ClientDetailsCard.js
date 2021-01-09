import React, { useMemo } from 'react';
import { Grid } from '@material-ui/core';
import DividerDataDisplay from '../shared/wrappers/DividerDisplay.js';
import { dateToLocaleDate } from '../shared/utils/format.js';
import { useSelector } from 'react-redux';
import { LANGUAGE } from 'app/utils/constants.js';
import EditClientButton from './EditClientButton.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { selectClientById } from './duck/selectors.js';
import { selectUserById } from 'features/home/duck/users/selectors.js';

const useStyles = makeStyles((theme) => ({
    clientInfoCard: {
        marginBottom: theme.spacing(2),
    }
}));

const {
    formLabels
} = LANGUAGE.client.clientDetails.clientDetailsDataDisplay;

const ClientDetailsCard = React.memo(function ClientDetailsDataDisplay() {
    const classes = useStyles();
    const { id: clientId } = useParams();
    const client = useSelector((state) => selectClientById(state, { clientId }));
    const clientDefaultContact = useMemo(
        () => client.contacts.find(c => c.default),
        [client.contacts]);
    const assignedTo = useSelector(state => selectUserById(state, client.assignedTo));
    const assignedToName = assignedTo?.name || null;
    const defaultContactName = clientDefaultContact?.name || null;
    const defaultContactEmail = clientDefaultContact?.email || null;

    const leftData = useMemo(() => [
        { label: formLabels.assignedTo, value: assignedToName },
        { label: formLabels.primaryContact, value: defaultContactName },
        { label: formLabels.contactEmail, value: defaultContactEmail },
        { label: formLabels.taxNumber, value: client.taxNumber }
    ], [
        client.taxNumber,
        assignedToName,
        defaultContactName,
        defaultContactEmail
    ]);

    const rightData = useMemo(() => [
        { label: formLabels.source, value: client.source },
        { label: formLabels.incoterm, value: client.incoterm },
        { label: formLabels.payment, value: client.payment },
        { label: formLabels.clientSince, value: dateToLocaleDate(client.clientSince) }
    ], [
        client.source,
        client.incoterm,
        client.payment,
        client.clientSince
    ]);

    return (
        <InfoCard
            title={ client.name }
            tools={ <EditClientButton client={ client } /> }
            className={ classes.clientInfoCard }
            content={
                <Grid container>
                    <Grid container item md={ 6 }>
                        <DividerDataDisplay data={ leftData }/>
                    </Grid>
                    <Grid container item md={ 6 }>
                        <DividerDataDisplay data={ rightData }/>
                    </Grid>
                </Grid>
            }
        />
    )
});

export default ClientDetailsCard;