import React, { useState } from 'react';
import { Card, Typography } from '@material-ui/core';
import { Edit as IconEdit } from '@material-ui/icons';
import { LANGUAGE } from '../../constants.js';
import {
    deleteAddress,
    updateAddress,
    updateDefaultAddress,
} from './duck/thunks.js';
import { useDispatch } from 'react-redux';
import DeleteButton from '../shared/buttons/DeleteButton.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import AddressDialog from '../shared/forms/AddressDialog.js';
import NewCompanyAddressButton from './NewCompanyAddressButton.js';
import Table from '../shared/components/Table.js';
import { makeStyles } from '@material-ui/core/styles';

const {
    addressesTableTitleLabel,
    addressTableHeadersMap,
    deleteDialogTitle,
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

    const onDeleteAddress = (companyId, addressId) =>
        dispatch(deleteAddress({ companyId, addressId }));

    const onSetDefaultAddress = (companyId, addressId) =>
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

    const deleteButton = (params) =>
        defaultAddress._id !== params.id ? (
            <DeleteButton
                onDelete={() => onDeleteAddress(companyId, params.id)}
                deleteMessage={deleteDialogTitle}
            />
        ) : (
            <span />
        );

    const setDefaultButton = (params) =>
        defaultAddress._id === params.id ? (
            <ThemedButton disabled>{defaultAddressButtonLabel}</ThemedButton>
        ) : (
            <ThemedButton
                onClick={() => onSetDefaultAddress(companyId, params.id)}
            >
                {setDefaultButtonLabel}
            </ThemedButton>
        );

    const columns = [
        { field: 'id', hide: true },
        { field: 'cancel', renderCell: deleteButton },
        { field: 'type', headerName: addressTableHeadersMap.type, width: 140 },
        { field: 'name', headerName: addressTableHeadersMap.name, width: 140 },
        {
            field: 'address',
            headerName: addressTableHeadersMap.address,
            width: 140,
        },
        {
            field: 'address2',
            headerName: addressTableHeadersMap.address2,
            width: 140,
        },
        { field: 'city', headerName: addressTableHeadersMap.city },
        {
            field: 'administrative',
            headerName: addressTableHeadersMap.administrative,
        },
        { field: 'country', headerName: addressTableHeadersMap.country },
        { field: 'zip', headerName: addressTableHeadersMap.zip },
        { field: 'phone', headerName: addressTableHeadersMap.phone },
        {
            field: 'email',
            headerName: addressTableHeadersMap.email,
            width: 140,
        },
        { field: 'default', renderCell: setDefaultButton, width: 140 },
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
        <Card className={className}>
            <Typography className={classes.addressTitle} variant="h5">
                {addressesTableTitleLabel}
            </Typography>
            <Table columns={columns} rows={rows} onRowClick={onRowClick} />
            {editAddress && (
                <AddressDialog
                    isOpen={isEditAddressOpen}
                    address={editAddress}
                    titleLabel={editAddressDialogTitleLabel}
                    submitLabel={editAddressDialogSubmitLabel}
                    onCancel={onEditAddressCancel}
                    onSubmit={onEditAddressSubmit}
                />
            )}
            <NewCompanyAddressButton
                className={classes.newAddressButton}
                company={company}
            />
        </Card>
    );
}
