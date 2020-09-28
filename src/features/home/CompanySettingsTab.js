import React, { useState } from 'react';
import {
    Card,
    Typography,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGE } from '../../constants.js';
import AddressDialogButton from './AddressDialogButton.js';
import EditableCard from '../shared/components/EditableCard.js';
import { selectCurrentCompany, selectError, selectStatus } from './duck/selectors.js';
import { makeStyles } from '@material-ui/core/styles';
import DeleteButton from '../shared/buttons/DeleteButton.js';
import { addNewAddress, deleteAddress, updateAddress, updateDefaultAddress } from './duck/thunks.js';
import ErrorMessage from '../shared/displays/ErrorMessage.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { Edit as IconEdit } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    top: {
        margin: theme.spacing(2)
    },
    tableTitle: {
        margin: theme.spacing(2)
    }
}));

const { addressesTitleLabel,
    addressTableHeadersMap,
    deleteDialogTitle,
    defaultAddressButtonLabel,
    setDefaultButtonLabel,
    addressDialogCancelLabel,
    editAddressDialogConfirmLabel,
    editAddressDialogTitleLabel,
    newAddressDialogConfirmLabel,
    newAddressDialogTitleLabel,
    newAddressButtonLabel
} = LANGUAGE.home.companySettingsTab;

export default function CompanySettingsTab({ company }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onEditCancel = () => setIsEdit(false);

    const onDeleteAddress = (addressId) => dispatch(deleteAddress({ companyId: company._id, addressId }));
    const onEditAddressConfirm = (data) => {
        data.companyId = company._id;
        dispatch(updateAddress(data));
    };
    const onAddAddressConfirm = (data) => {
        const { id, ...rest } = data;
        rest.companyId = company._id;
        dispatch(addNewAddress(rest));
    };

    const onSetDefaultAddress = (addressId) => dispatch(updateDefaultAddress({ companyId: company._id, addressId}));

    return (
        <>
            <EditableCard
                title={ company.legalAddress.name }
                isEdit={ isEdit }
                onEdit={ onEdit }
                onCancel={ onEditCancel }
                styles={ classes.top }
            >
                { !isEdit && <Typography>{ company.legalAddress.address }</Typography> }
            </EditableCard>
            <Card>
                <Grid container>
                    <Grid container justify="space-between" alignItems="center" item xs={12}>
                        <Typography variant="h5" className={classes.tableTitle}>{ addressesTitleLabel }</Typography>
                        <AddressDialogButton
                            cancelButtonLabel={addressDialogCancelLabel}
                            confirmButtonLabel={newAddressDialogConfirmLabel}
                            dialogTitle={newAddressDialogTitleLabel}
                            onConfirm={onAddAddressConfirm}
                        >{newAddressButtonLabel}</AddressDialogButton>
                    </Grid>
                    <Grid item xs={12}>
                        { status === 'REJECTED' && <ErrorMessage errors={ [error] }/> }
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell/>
                                        { Object.entries(addressTableHeadersMap).map(([key, value]) => <TableCell
                                            key={ key }>{ value }</TableCell>) }
                                        <TableCell/>
                                        <TableCell/>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { company.addresses.map((address, index) => (
                                        <TableRow key={ index }>
                                            <TableCell>
                                                { company.defaultAddress === address._id
                                                    ? null
                                                    : <DeleteButton
                                                        deleteMessage={ deleteDialogTitle }
                                                        onDeleteClick={ () => onDeleteAddress(address._id) }
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
                                                {company.defaultAddress === address._id
                                                    ? <ThemedButton disabled>{defaultAddressButtonLabel}</ThemedButton>
                                                    : <ThemedButton onClick={() => onSetDefaultAddress(address._id)}>{setDefaultButtonLabel}</ThemedButton>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )) }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}