import React, { useState } from 'react';
import { LANGUAGE } from '../../constants.js';
import Table from '../shared/components/Table.js';
import { Box } from '@material-ui/core';
import AddressDialog from '../shared/forms/AddressDialog.js';
import { useDispatch } from 'react-redux';
import NewClientAddressButton from './NewClientAddressButton.js';
import { deleteClientAddress, updateDefaultClientAddress } from './duck/thunks.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { defaultTableHeaders } from '../orders/duck/slice.js';

const {
    addressTableHeadersMap,
    editAddressDialogTitleLabel,
    editAddressDialogSubmitLabel,
    setDefaultButtonLabel,
    defaultAddressButtonLabel
} = LANGUAGE.client.clientDetails.clientAddressTable;

export default function ClientAddressesTable({ client }) {
    const dispatch = useDispatch();
    const { _id: clientId, addresses, defaultAddress } = client;
    const [isEdit, setIsEdit] = useState(false);
    const [editAddress, setEditAddress] = useState(null);

    const onRowClick = (params) => {
        setEditAddress(addresses.find((a) => a._id === params.id));
        setIsEdit(true);
    }
    const onEditAddressCancel = () => setIsEdit(false);
    const onEditAddressSubmit = (data) => {
        data.clientId = clientId;
        dispatch();
        setIsEdit(false);
    };

    const onDeleteAddress = (addressId) => {
        dispatch(deleteClientAddress({ clientId, addressId }));
        setIsEdit(false);
    };

    const onSetDefaultAddress = (addressId) =>
        dispatch(updateDefaultClientAddress({ clientId, addressId }));

    const setDefaultButton = (params) =>
        defaultAddress._id === params.id
            ? <ThemedButton disabled>{ defaultAddressButtonLabel }</ThemedButton>
            : <ThemedButton onClick={ () => onSetDefaultAddress(params.id) }>
                { setDefaultButtonLabel }
            </ThemedButton>;

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
        { field: 'default', renderCell: setDefaultButton }
    ];

    const rows = addresses.map(address => ({
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
        email: address.email
    }));

    return (
        <Box>
            <Table
                rows={ rows }
                columns={ columns }
                onRowClick={ onRowClick }
            />
            { editAddress && (
                <AddressDialog
                    isOpen={ isEdit }
                    address={ editAddress }
                    titleLabel={ editAddressDialogTitleLabel }
                    submitLabel={ editAddressDialogSubmitLabel }
                    onCancel={ onEditAddressCancel }
                    onSubmit={ onEditAddressSubmit }
                    onDelete={
                        editAddress._id !== client.defaultAddress._id
                            ? () => onDeleteAddress(editAddress._id)
                            : null
                    }
                />
            ) }
            <NewClientAddressButton client={ client }/>
        </Box>
    )
}