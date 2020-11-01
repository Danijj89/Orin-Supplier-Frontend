import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectClientById, selectClientStatus } from './duck/selectors.js';
import { Container } from '@material-ui/core';
import { fetchClientById, updateClientNotes } from './duck/thunks.js';
import Loader from '../shared/components/Loader.js';
import ColumnInfoDisplay from '../shared/wrappers/ColumnInfoDisplay.js';
import { LANGUAGE } from '../../app/constants.js';
import ClientInfoTable from './ClientInfoTable.js';
import EditClientButton from './EditClientButton.js';
import { dateToLocaleDate } from '../shared/utils/format.js';
import { selectAllUsers, selectUserStatus } from '../users/duck/selectors.js';
import { determineStatus, isLoading } from '../shared/utils/state.js';
import { cleanClientStore } from './duck/slice.js';
import { makeStyles } from '@material-ui/core/styles';
import TextAreaCard from '../shared/components/TextAreaCard.js';

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

export default function ClientDetails({ match }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = match.params;
    const client = useSelector((state) => selectClientById(state, id));
    const users = useSelector(selectAllUsers);
    const clientStatus = useSelector(selectClientStatus);
    const userStatus = useSelector(selectUserStatus);
    const status = determineStatus([clientStatus, userStatus]);
    const loading = isLoading([clientStatus, userStatus]);

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

    useEffect(() => {
        if (!client) dispatch(fetchClientById(id));
        return () => dispatch(cleanClientStore());
    }, [dispatch, id, client]);

    return (
        <Container>
            { loading && <Loader/> }
            { client?.active === false && <Redirect to={ '/home/clients' }/> }
            { client && users && (
                <InfoCard
                    title={ client.name }
                    button={ <EditClientButton client={ client } users={ users }/> }
                    className={ classes.clientInfoCard }
                    content={
                        <ColumnInfoDisplay
                            leftData={ leftData }
                            rightData={ rightData }
                        />
                    }
                />
            ) }
            { client && <TextAreaCard titleLabel={ notesLabel } className={classes.notesCard} value={ client.notes } onSubmit={ onNotesSubmit }/> }
            { client && <ClientInfoTable client={ client }/> }
        </Container>
    );
}
