import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectClientById } from './duck/selectors.js';
import { Container } from '@material-ui/core';
import { updateClientNotes } from './duck/thunks.js';
import { LANGUAGE } from '../../app/constants.js';
import ClientInfoTable from './ClientInfoTable.js';
import { makeStyles } from '@material-ui/core/styles';
import TextAreaCard from '../shared/components/TextAreaCard.js';
import ClientDetailsCard from './ClientDetailsCard.js';

const {
    notesLabel
} = LANGUAGE.client.clientDetails;

const useStyles = makeStyles((theme) => ({
    notesCard: {
        marginBottom: theme.spacing(2),
    }
}));

const Client = React.memo(function Client() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const client = useSelector((state) => selectClientById(state, id));

    const onNotesSubmit = (notes) =>
        dispatch(updateClientNotes({ id: client._id, notes }));

    return (
        <Container>
            <ClientDetailsCard client={ client }/>
            <TextAreaCard
                titleLabel={ notesLabel }
                className={ classes.notesCard }
                value={ client.notes }
                onSubmit={ onNotesSubmit }
            />
            <ClientInfoTable
                clientId={ client._id }
                clientName={ client.name }
                clientAddresses={ client.addresses }
                clientDefaultAddress={ client.defaultAddress }
                clientContact={ client.contact }
                clientDefaultContact={ client.defaultContact }
                clientOrders={ client.orders }
            />
        </Container>
    );
});

export default Client;
