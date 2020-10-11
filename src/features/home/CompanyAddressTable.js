import React, { useState } from 'react';
import { Card, Typography } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import {
    deleteAddress,
    updateAddress,
    updateDefaultAddress,
} from '../../app/duck/thunks.js';
import { useDispatch } from 'react-redux';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import AddressDialog from '../shared/forms/AddressDialog.js';
import NewCompanyAddressButton from './NewCompanyAddressButton.js';
import Table from '../shared/components/Table.js';
import { makeStyles } from '@material-ui/core/styles';

const {
    addressesTableTitleLabel,
    addressTableHeadersMap,
    defaultAddressButtonLabel,
    setDefaultButtonLabel,
    editAddressDialogTitleLabel,
    editAddressDialogSubmitLabel,
} = LANGUAGE.home.companyDetails;

const useStyles = makeStyles((theme) => ({
    addressTitle: {
        fontWeight: 'bold',
        padding: theme.spacing(2),
        color: theme.palette.tertiary[700],
    },
    newAddressButton: {
        margin: theme.spacing(2),
    },
}));

export default function CompanyAddressTable({ company, className }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { _id: companyId, addresses, defaultAddress } = company;
    const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
    const [editAddress, setEditAddress] = useState(null);

    const onDeleteAddress = (addressId) => {
        dispatch(deleteAddress({ companyId, addressId }));
        setIsEditAddressOpen(false);
    };

    const onSetDefaultAddress = (addressId) =>
        dispatch(updateDefaultAddress({ companyId, addressId }));

    const onRowClick = (params) => {
        setEditAddress(addresses.find((a) => a._id === params.id));
        setIsEditAddressOpen(true);
    };

    const onEditAddressCancel = () => setIsEditAddressOpen(false);

    const onEditAddressSubmit = (data) => {
        data.companyId = companyId;
        dispatch(updateAddress(data));
        setIsEditAddressOpen(false);
    };

    const setDefaultButton = (params) =>
        defaultAddress._id === params.id ? (
            <ThemedButton disabled>{ defaultAddressButtonLabel }</ThemedButton>
        ) : (
            <ThemedButton
                onClick={ () => onSetDefaultAddress(params.id) }
            >
                { setDefaultButtonLabel }
            </ThemedButton>
        );

    const columns = [
        { field: 'id', hide: true },
        { field: 'type', headerName: addressTableHeadersMap.type },
        { field: 'name', headerName: addressTableHeadersMap.name },
        { field: 'address', headerName: addressTableHeadersMap.address },
        { field: 'address2', headerName: addressTableHeadersMap.address2 },
        { field: 'city', headerName: addressTableHeadersMap.city },
        { field: 'administrative', headerName: addressTableHeadersMap.administrative },
        { field: 'country', headerName: addressTableHeadersMap.country },
        { field: 'zip', headerName: addressTableHeadersMap.zip },
        { field: 'phone', headerName: addressTableHeadersMap.phone },
        { field: 'email', headerName: addressTableHeadersMap.email },
        { field: 'default', renderCell: setDefaultButton },
    ];

    const rows = addresses.map((address) => ({
        id: address._id,
        type: address.type,
        name: address.name,
        address: address.address,
        address2: address.address2,
        city: address.city,
        administrative: address.administrative,
        country: address.country,
        zip: address.zip,
        phone: address.phone,
        email: address.email,
    }));

    return (
        <Card className={ className }>
            <Typography className={ classes.addressTitle } variant="h5">
                { addressesTableTitleLabel }
            </Typography>
            <Table columns={ columns } rows={ rows } onRowClick={ onRowClick }/>
            { editAddress && (
                <AddressDialog
                    isOpen={ isEditAddressOpen }
                    address={ editAddress }
                    titleLabel={ editAddressDialogTitleLabel }
                    submitLabel={ editAddressDialogSubmitLabel }
                    onCancel={ onEditAddressCancel }
                    onSubmit={ onEditAddressSubmit }
                    onDelete={
                        editAddress._id !== company.legalAddress._id
                        && editAddress._id !== company.defaultAddress._id
                            ? () => onDeleteAddress(editAddress._id)
                            : null
                    }
                />
            ) }
            <NewCompanyAddressButton
                className={ classes.newAddressButton }
                company={ company }
            />
        </Card>
    );
}
