import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectClientNotes } from './duck/selectors.js';
import { Container } from '@material-ui/core';
import { updateClient } from './duck/thunks.js';
import { LANGUAGE } from '../../app/utils/constants.js';
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
    const { id: clientId } = useParams();
    const clientNotes = useSelector((state) => selectClientNotes(state, { clientId }));

    const onNotesSubmit = (notes) =>
        dispatch(updateClient({ clientId, update: { notes } }));

    return (
        <Container>
            <ClientDetailsCard />
            <TextAreaCard
                titleLabel={ notesLabel }
                className={ classes.notesCard }
                value={ clientNotes }
                onSubmit={ onNotesSubmit }
            />
            <ClientInfoTable/>
        </Container>
    );
});

export default Client;
