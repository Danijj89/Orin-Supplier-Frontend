import React, { useCallback, useState } from 'react';
import { Paper, Box, Typography, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import AddressDialog from '../shared/forms/AddressDialog.js';
import { makeStyles } from '@material-ui/core/styles';
import AddressCard from '../shared/components/AddressCard.js';
import { deleteClientAddress, updateAddress, updateDefaultClientAddress } from './duck/thunks.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import NewClientAddressButton from '../shared/buttons/NewClientAddressButton.js';
import { useParams } from 'react-router-dom';
import { selectClientActiveAddresses, selectClientById } from './duck/selectors.js';
import { countryToCountryCode } from '../shared/utils/entityConversion.js';
import { getOptionId } from '../../app/utils/options/getters.js';

const useStyles = makeStyles((theme) => ({
    cards: {
        display: 'flex',
    },
    addressTitle: {
        fontWeight: 'bold',
        fontSize: '1rem',
        padding: theme.spacing(2),
        color: theme.palette.tertiary[700],
    },
    newAddressButton: {
        margin: theme.spacing(2),
    },
}));

const {
    addressesTableTitleLabel,
    editAddressDialogTitleLabel,
    editAddressDialogSubmitLabel,
} = LANGUAGE.client.clientDetails.clientAddressCards;

const ClientAddressCards = React.memo(function ClientAddressCards() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id: clientId } = useParams();
    const client = useSelector((state) => selectClientById(state, clientId));
    const clientAddresses = useSelector(state => selectClientActiveAddresses(state, clientId));
    const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
    const [editAddress, setEditAddress] = useState(null);

    const createDeleteAddressHandler = useCallback(
        (clientId, addressId) => () => {
        dispatch(deleteClientAddress({ clientId, addressId }));
        setIsEditAddressOpen(false);
    }, [dispatch]);

    const createSetDefaultAddressHandler = useCallback(
        (clientId, addressId) =>
            () => dispatch(updateDefaultClientAddress({ clientId, addressId })),
        [dispatch]);

    const createEditAddressHandler = useCallback(
        (address) => () => {
        setEditAddress(address);
        setIsEditAddressOpen(true);
    }, []);

    const onEditAddressCancel = () => setIsEditAddressOpen(false);

    const onSubmit = (data) => {
        const { _id: addressId, ...update } = data;
        update.country = getOptionId(update.country);
        dispatch(updateAddress({ clientId, addressId, update }));
        setIsEditAddressOpen(false);
    };

    return (
        <Paper>
            <Typography className={ classes.addressTitle } variant="h5">
                { addressesTableTitleLabel }
            </Typography>
            <Box className={ classes.cards }>
                <Grid container>
                    { clientAddresses.map((address) => (
                        <Grid item xs={ 12 } sm={ 6 } lg={ 4 } key={ address._id }>
                            <AddressCard
                                address={ address }
                                onEdit={ createEditAddressHandler(address) }
                                onDelete={ createDeleteAddressHandler(clientId, address._id) }
                                onSetDefault={ createSetDefaultAddressHandler(clientId, address._id) }
                            />
                        </Grid>
                    )) }
                </Grid>
            </Box>
            { editAddress && (
                <AddressDialog
                    isOpen={ isEditAddressOpen }
                    address={ editAddress }
                    titleLabel={ editAddressDialogTitleLabel }
                    submitLabel={ editAddressDialogSubmitLabel }
                    onCancel={ onEditAddressCancel }
                    onSubmit={ onSubmit }
                />
            ) }
            <NewClientAddressButton
                className={ classes.newAddressButton }
                clientId={ clientId }
                clientName={ client.name }
            />
        </Paper>
    );
});

export default ClientAddressCards;
