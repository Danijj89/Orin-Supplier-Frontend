import React, { useState } from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import AddressDialog from '../shared/forms/AddressDialog.js';
import NewCompanyAddressButton from './NewCompanyAddressButton.js';
import { makeStyles } from '@material-ui/core/styles';
import { deleteAddress, updateAddress, updateDefaultAddress } from './duck/thunks.js';
import AddressCard from '../shared/components/AddressCard.js';
import { selectCompanyActiveAddresses, selectCurrentCompany } from './duck/selectors.js';

const useStyles = makeStyles((theme) => ({
    cards: {
        display: 'flex',
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

const CompanyAddressCards = React.memo(function CompanyAddressCards() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const company = useSelector(selectCurrentCompany);
    const companyAddresses = useSelector(selectCompanyActiveAddresses);
    const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
    const [editAddress, setEditAddress] = useState(null);

    const onDeleteAddress = (addressId) => {
        dispatch(deleteAddress({ companyId: company._id, addressId }));
        setIsEditAddressOpen(false);
    };

    const onSetDefaultAddress = (addressId) =>
        dispatch(updateDefaultAddress({ companyId: company._id, addressId }));

    const onEditAddress = (addressId) => {
        setEditAddress(companyAddresses.find((a) => a._id === addressId));
        setIsEditAddressOpen(true);
    };

    const onEditAddressCancel = () => setIsEditAddressOpen(false);

    const onEditAddressSubmit = (data) => {
        const { _id, ...update } = data;
        dispatch(updateAddress({ companyId: company._id, addressId: _id, update }));
        setIsEditAddressOpen(false);
    };

    const isDefaultAddress = (addressId) =>
        addressId === company.legalAddress._id || addressId === company.defaultAddress._id;

    return (
        <Box>
            <Typography className={ classes.addressTitle } variant="h5">
                { addressesTableTitleLabel }
            </Typography>
            <Box className={ classes.cards }>
                <Grid container>
                    { companyAddresses.map((address) =>
                        <Grid item xs={ 12 } sm={ 6 } lg={ 4 } key={ address._id }>
                            <AddressCard
                                address={ address }
                                isDefault={ isDefaultAddress(address._id) }
                                onEdit={ () => onEditAddress(address._id) }
                                onDelete={ () => onDeleteAddress(address._id) }
                                onSetDefault={ () =>
                                    onSetDefaultAddress(address._id)
                                }
                            />
                        </Grid>
                    ) }
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
            <NewCompanyAddressButton
                className={ classes.newAddressButton }
                company={ company }
            />
        </Box>
    );
});

export default CompanyAddressCards;
