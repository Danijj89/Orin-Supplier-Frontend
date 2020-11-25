import React, { useState } from 'react';
import { Paper, Box, Typography, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import AddressDialog from '../shared/forms/AddressDialog.js';
import { makeStyles } from '@material-ui/core/styles';
import AddressCard from '../shared/components/AddressCard.js';
import { deleteClientAddress, updateAddress, updateDefaultClientAddress } from './duck/thunks.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import NewClientAddressButton from '../shared/buttons/NewClientAddressButton.js';

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

export default function ClientAddressCards({ clientId, clientName, clientAddresses, clientDefaultAddress, className }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
    const [editAddress, setEditAddress] = useState(null);

    const onDeleteAddress = (addressId) => {
        dispatch(deleteClientAddress({ clientId, addressId }));
        setIsEditAddressOpen(false);
    };

    const onSetDefaultAddress = (addressId) =>
        dispatch(updateDefaultClientAddress({ clientId, addressId }));

    const onEditAddress = (addressId) => {
        setEditAddress(clientAddresses.find((a) => a._id === addressId));
        setIsEditAddressOpen(true);
    };

    const onEditAddressCancel = () => setIsEditAddressOpen(false);

    const onEditAddressSubmit = (data) => {
        data.clientId = clientId;
        dispatch(updateAddress(data));
        setIsEditAddressOpen(false);
    };

    return (
        <Paper className={ className }>
            <Typography className={ classes.addressTitle } variant="h5">
                { addressesTableTitleLabel }
            </Typography>
            <Box className={ classes.cards }>
                <Grid container>
                    { clientAddresses.filter(address => address.active).map((address) => (
                        <Grid item xs={ 12 } sm={ 6 } lg={ 4 } key={ address._id }>
                            <AddressCard
                                address={ address }
                                isDefault={ clientDefaultAddress._id === address._id }
                                onEdit={ () => onEditAddress(address._id) }
                                onDelete={ () => onDeleteAddress(address._id) }
                                onSetDefault={ () => onSetDefaultAddress(address._id) }
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
                    onSubmit={ onEditAddressSubmit }
                />
            ) }
            <NewClientAddressButton
                className={ classes.newAddressButton }
                clientId={ clientId }
                clientName={ clientName }
            />
        </Paper>
    );
}
