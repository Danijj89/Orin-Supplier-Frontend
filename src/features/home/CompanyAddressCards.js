import React, { useState } from 'react';
import { Paper, Box, Typography } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch } from 'react-redux';
import AddressDialog from '../shared/forms/AddressDialog.js';
import NewCompanyAddressButton from './NewCompanyAddressButton.js';
import { makeStyles } from '@material-ui/core/styles';
import { deleteAddress, updateDefaultAddress } from './duck/thunks.js';
import { updateAddress } from '../clients/duck/thunks.js';
import AddressCard from '../shared/components/AddressCard.js';

const useStyles = makeStyles((theme) => ({
    cards: {
        display: 'flex'
    },
    addressTitle: {
        fontWeight: 'bold',
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
} = LANGUAGE.home.companyDetails;

export default function CompanyAddressCards({ company, className }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { _id: companyId, addresses, defaultAddress, legalAddress } = company;
    const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
    const [editAddress, setEditAddress] = useState(null);

    const onDeleteAddress = (addressId) => {
        dispatch(deleteAddress({ companyId, addressId }));
        setIsEditAddressOpen(false);
    };

    const onSetDefaultAddress = (addressId) =>
        dispatch(updateDefaultAddress({ companyId, addressId }));

    const onEditAddress = (addressId) => {
        setEditAddress(addresses.find((a) => a._id === addressId));
        setIsEditAddressOpen(true);
    };

    const onEditAddressCancel = () => setIsEditAddressOpen(false);

    const onEditAddressSubmit = (data) => {
        data.companyId = companyId;
        dispatch(updateAddress(data));
        setIsEditAddressOpen(false);
    };

    const isDefaultAddress = (addressId) =>
        addressId === legalAddress._id || addressId === defaultAddress._id;

    return (
        <Paper className={ className }>
            <Typography className={ classes.addressTitle } variant="h5">
                { addressesTableTitleLabel }
            </Typography>
            <Box className={ classes.cards }>
                { addresses.map(address =>
                    <AddressCard
                        key={ address._id }
                        address={ address }
                        isDefault={ isDefaultAddress(address._id) }
                        onEdit={ () => onEditAddress(address._id) }
                        onDelete={ () => onDeleteAddress(address._id) }
                        onSetDefault={ () => onSetDefaultAddress(address._id) }
                    />
                ) }
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
            <NewCompanyAddressButton
                className={ classes.newAddressButton }
                company={ company }
            />
        </Paper>
    );
}
