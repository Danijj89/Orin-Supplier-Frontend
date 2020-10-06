import React, { useState } from 'react';
import { Card, Typography } from '@material-ui/core';
import { Edit as IconEdit } from '@material-ui/icons';
import { LANGUAGE } from '../../constants.js';
import Table from '../shared/wrappers/Table.js';
import { addNewAddress, deleteAddress, updateAddress, updateDefaultAddress } from './duck/thunks.js';
import { useDispatch } from 'react-redux';
import DeleteButton from '../shared/buttons/DeleteButton.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import AddressDialog from '../shared/forms/AddressDialog.js';

const {
    addressesTableTitleLabel,
    addressTableHeadersMap,
    deleteDialogTitle,
    defaultAddressButtonLabel,
    setDefaultButtonLabel,
    editAddressDialogTitleLabel,
    editAddressDialogSubmitLabel,
    newAddressButtonLabel,
    newAddressDialogTitleLabel,
    newAddressDialogSubmitLabel
} = LANGUAGE.home.companyDetails;

export default function CompanyAddressTable({ company, className }) {
    const dispatch = useDispatch();
    const { _id: companyId, addresses, defaultAddress } = company;
    const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
    const [editAddress, setEditAddress] = useState(null);
    const [isNewAddressOpen, setIsNewAddressOpen] = useState(false);

    const onDeleteAddress = (companyId, addressId) =>
        dispatch(deleteAddress({ companyId, addressId }));

    const onSetDefaultAddress = (companyId, addressId) => dispatch(updateDefaultAddress({ companyId, addressId }));

    const onEditAddress = (addressId) => {
        setEditAddress(addresses.find(a => a._id === addressId));
        setIsEditAddressOpen(true);
    };

    const onEditAddressCancel = () => setIsEditAddressOpen(false);

    const onEditAddressSubmit = (data) => {
        data.companyId = companyId;
        dispatch(updateAddress(data));
    };

    const onAddAddress = () => setIsNewAddressOpen(true);
    const onAddAddressCancel = () => setIsNewAddressOpen(false);

    const onAddAddressSubmit = (data) => {
        const { id, ...rest } = data;
        rest.companyId = companyId;
        dispatch(addNewAddress(rest));
    };

    const deleteButton = params =>
        defaultAddress._id !== params.value
        ? <DeleteButton
            onDelete={ () => onDeleteAddress(companyId, params.value) }
            deleteMessage={ deleteDialogTitle }
        />
        : <span />;

    const editButton = params =>
        <ThemedButton
            variant="text"
            onClick={() => onEditAddress(params.value)}
        >
            <IconEdit />
        </ThemedButton>

    const setDefaultButton = (params) =>
        defaultAddress._id === params.value
            ? <ThemedButton
                disabled
            >{ defaultAddressButtonLabel }</ThemedButton>
            : <ThemedButton
                onClick={ () => onSetDefaultAddress(companyId, params.value) }
            >{ setDefaultButtonLabel }</ThemedButton>;


    const columns = [
        { field: 'id', hide: true },
        { field: 'cancel', renderHeader: () => <span/>, renderCell: deleteButton },
        { field: 'type', headerName: addressTableHeadersMap.type, width: 140 },
        { field: 'name', headerName: addressTableHeadersMap.name, width: 140 },
        { field: 'address', headerName: addressTableHeadersMap.address, width: 140 },
        { field: 'address2', headerName: addressTableHeadersMap.address2, width: 140 },
        { field: 'city', headerName: addressTableHeadersMap.city },
        { field: 'administrative', headerName: addressTableHeadersMap.administrative },
        { field: 'country', headerName: addressTableHeadersMap.country },
        { field: 'zip', headerName: addressTableHeadersMap.zip },
        { field: 'phone', headerName: addressTableHeadersMap.phone },
        { field: 'email', headerName: addressTableHeadersMap.email, width: 140 },
        { field: 'edit', renderHeader: () => <span/>, renderCell: editButton },
        { field: 'default', renderHeader: () => <span/>, renderCell: setDefaultButton, width: 140 }
    ];

    const rows = addresses.map(address => ({
        id: address._id,
        cancel: address._id,
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
        edit: address._id,
        default: address._id
    }));

    return (
        <Card className={ className }>
            <Typography variant="h5">{ addressesTableTitleLabel }</Typography>
            <Table columns={ columns } rows={ rows } autoHeight/>
            { editAddress && <AddressDialog
                isOpen={isEditAddressOpen}
                address={editAddress}
                titleLabel={editAddressDialogTitleLabel}
                submitLabel={editAddressDialogSubmitLabel}
                onCancel={onEditAddressCancel}
                onSubmit={onEditAddressSubmit}
            /> }
            <ThemedButton
                onClick={onAddAddress}
            >{newAddressButtonLabel}</ThemedButton>
            { <AddressDialog
                isOpen={isNewAddressOpen}
                titleLabel={newAddressDialogTitleLabel}
                submitLabel={newAddressDialogSubmitLabel}
                onCancel={onAddAddressCancel}
                onSubmit={onAddAddressSubmit}
            /> }
        </Card>
    )
}