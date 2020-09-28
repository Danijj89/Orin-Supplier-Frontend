import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import DeleteButton from '../shared/buttons/DeleteButton.js';
import AddressDialogButton from './AddressDialogButton.js';
import { Edit as IconEdit } from '@material-ui/icons';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../constants.js';

const {
    editAddressDialogConfirmLabel,
    editAddressDialogTitleLabel,
    deleteDialogTitle,
    defaultAddressButtonLabel,
    setDefaultButtonLabel,
    addressDialogCancelLabel
} = LANGUAGE.home.companySettingsTab;

export default function AddressTableRow(
    { defaultAddress, address, onDeleteAddress, onEditAddressConfirm, onSetDefaultAddress }) {

    return (
        <TableRow>
            <TableCell>
                { defaultAddress === address._id
                    ? null
                    : <DeleteButton
                        deleteMessage={ deleteDialogTitle }
                        onDeleteClick={ onDeleteAddress }
                    />
                }
            </TableCell>
            <TableCell>{ address.type }</TableCell>
            <TableCell>{ address.name }</TableCell>
            <TableCell>{ address.address }</TableCell>
            <TableCell>{ address.city }</TableCell>
            <TableCell>{ address.administrative }</TableCell>
            <TableCell>{ address.country }</TableCell>
            <TableCell>{ address.zip }</TableCell>
            <TableCell>{ address.phone }</TableCell>
            <TableCell>
                <AddressDialogButton
                    address={address}
                    cancelButtonLabel={addressDialogCancelLabel}
                    dialogTitle={editAddressDialogTitleLabel}
                    confirmButtonLabel={editAddressDialogConfirmLabel}
                    onConfirm={onEditAddressConfirm}
                >
                    <IconEdit fontSize="small"/>
                </AddressDialogButton>
            </TableCell>
            <TableCell>
                {defaultAddress === address._id
                    ? <ThemedButton disabled>{defaultAddressButtonLabel}</ThemedButton>
                    : <ThemedButton onClick={onSetDefaultAddress}>{setDefaultButtonLabel}</ThemedButton>
                }
            </TableCell>
        </TableRow>
    )
}