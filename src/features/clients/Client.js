import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectClientNotes } from './duck/selectors.js';
import { Container, Paper } from '@material-ui/core';
import { updateClient } from './duck/thunks.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { makeStyles } from '@material-ui/core/styles';
import TextAreaCard from '../shared/components/TextAreaCard.js';
import ClientDetailsCard from './ClientDetailsCard.js';
import NavTabs from '../shared/components/NavTabs.js';
import ClientAddressCards from './ClientAddressCards.js';
import ClientContactsTable from './ClientContactsTable.js';
import ClientOrdersTable from './ClientOrdersTable.js';
import queryString from 'query-string';

const {
    notesLabel,
    tabsLabelsMap
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
    const history = useHistory();
    const location = useLocation();
    const { tab } = queryString.parse(location.search);
    const tabValue = tab || 'addresses';
    const clientNotes = useSelector((state) => selectClientNotes(state, { clientId }));

    const onNotesSubmit = (notes) =>
        dispatch(updateClient({ clientId, update: { notes } }));

    const setTabValue = (newValue) =>
        history.push(`${ location.pathname }?tab=${ newValue }`);

    return (
        <Container>
            <ClientDetailsCard/>
            <TextAreaCard
                titleLabel={ notesLabel }
                className={ classes.notesCard }
                value={ clientNotes }
                onSubmit={ onNotesSubmit }
            />
            <Paper>
                <NavTabs
                    tabsLabelsMap={ tabsLabelsMap }
                    tabValue={ tabValue }
                    onChange={ setTabValue }
                />
                { tabValue === 'addresses' &&
                <ClientAddressCards/> }
                { tabValue === 'contacts' &&
                <ClientContactsTable/> }
                { tabValue === 'orders' &&
                <ClientOrdersTable/> }
            </Paper>
        </Container>
    );
});

export default Client;
