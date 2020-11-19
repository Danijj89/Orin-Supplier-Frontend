import React from 'react';
import { useParams } from 'react-router-dom';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectClientById } from './duck/selectors.js';
import { Container, Grid } from '@material-ui/core';
import { updateClientNotes } from './duck/thunks.js';
import { LANGUAGE } from '../../app/constants.js';
import ClientInfoTable from './ClientInfoTable.js';
import EditClientButton from './EditClientButton.js';
import { dateToLocaleDate } from '../shared/utils/format.js';
import { selectAllUsers } from '../users/duck/selectors.js';
import { makeStyles } from '@material-ui/core/styles';
import TextAreaCard from '../shared/components/TextAreaCard.js';
import DividerDataDisplay from '../shared/wrappers/DividerDisplay.js';

const {
    assignedToLabel,
    primaryContactLabel,
    contactEmailLabel,
    taxNumberLabel,
    sourceLabel,
    incotermLabel,
    paymentLabel,
    clientSinceLabel,
    notesLabel
} = LANGUAGE.client.clientDetails;

const useStyles = makeStyles((theme) => ({
    clientInfoCard: {
        marginBottom: theme.spacing(2),
    },
    notesCard: {
        marginBottom: theme.spacing(2),
    },
}));

export default function Client() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const client = useSelector((state) => selectClientById(state, id));
    const users = useSelector(selectAllUsers);

    const onNotesSubmit = (notes) =>
        dispatch(updateClientNotes({ id: client._id, notes }));

    const leftData = [
        { label: assignedToLabel, value: client?.assignedTo?.name },
        { label: primaryContactLabel, value: client?.defaultContact?.name },
        { label: contactEmailLabel, value: client?.defaultContact?.email },
        { label: taxNumberLabel, value: client?.taxNumber }
    ];

    const rightData = [
        { label: sourceLabel, value: client?.source },
        { label: incotermLabel, value: client?.incoterm },
        { label: paymentLabel, value: client?.payment },
        { label: clientSinceLabel, value: dateToLocaleDate(client?.clientSince) }
    ];

    return (
        <Container>
            <InfoCard
                title={ client.name }
                button={ <EditClientButton client={ client } users={ users }/> }
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
            <TextAreaCard
                titleLabel={ notesLabel }
                className={ classes.notesCard }
                value={ client.notes }
                onSubmit={ onNotesSubmit }
            />
            <ClientInfoTable client={ client }/>
        </Container>
    );
}
