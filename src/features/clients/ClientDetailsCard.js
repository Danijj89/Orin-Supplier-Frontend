import React, { useMemo } from 'react';
import { Grid } from '@material-ui/core';
import DividerDataDisplay from '../shared/wrappers/DividerDisplay.js';
import { dateToLocaleDate } from '../shared/utils/format.js';
import { useSelector } from 'react-redux';
import { selectUsersMap } from '../users/duck/selectors.js';
import { LANGUAGE } from '../../app/constants.js';
import EditClientButton from './EditClientButton.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    clientInfoCard: {
        marginBottom: theme.spacing(2),
    }
}));

const {
    formLabels
} = LANGUAGE.client.clientDetails.clientDetailsDataDisplay;

const ClientDetailsCard = React.memo(function ClientDetailsDataDisplay({ client }) {
    const classes = useStyles();
    const usersMap = useSelector(selectUsersMap);
    const defaultContactName = client.defaultContact?.name || null;
    const defaultContactEmail = client.defaultContact?.email || null;

    const leftData = useMemo(() => [
        { label: formLabels.assignedTo, value: usersMap[client.assignedTo].name },
        { label: formLabels.primaryContact, value: defaultContactName },
        { label: formLabels.contactEmail, value: defaultContactEmail },
        { label: formLabels.taxNumber, value: client.taxNumber }
    ], [
        client.assignedTo,
        defaultContactName,
        defaultContactEmail,
        client.taxNumber,
        usersMap
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
            button={ <EditClientButton client={ client } /> }
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
}, (prev, next) => {
    const prevClient = prev.client;
    const nextClient = next.client;
    return prevClient.assignedTo === nextClient.assignedTo
        && prevClient.defaultContact === nextClient.defaultContact
        && prevClient.taxNumber === nextClient.taxNumber
        && prevClient.source === nextClient.source
        && prevClient.incoterm === nextClient.incoterm
        && prevClient.payment === nextClient.payment
});

export default ClientDetailsCard;