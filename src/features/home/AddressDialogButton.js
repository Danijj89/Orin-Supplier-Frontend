import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { LANGUAGE } from '../../constants.js';

const {
    typeLabel,
    nameLabel,
    addressLabel,
    address2Label,
    cityLabel,
    administrativeLabel,
    countryLabel,
    zipLabel,
    phoneLabel,
    emailLabel
} = LANGUAGE.home.newAddressButton;

export default function AddressDialogButton(
    { children, cancelButtonLabel, confirmButtonLabel, onConfirm, address, dialogTitle, ...props }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { register, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            id: address?._id,
            type: address?.type,
            name: address?.name,
            address: address?.address,
            address2: address?.address2,
            city: address?.city,
            administrative: address?.administrative,
            country: address?.country,
            zip: address?.zip,
            phone: address?.phone,
            email: address?.email
        }
    });

    const onAddAddress = () => setIsDialogOpen(true);
    const onAddressDialogCancel = () => setIsDialogOpen(false);
    const onCreateAddress = (data) => {
        onConfirm(data);
        setIsDialogOpen(false);
    };

    return (
        <>
            <ThemedButton onClick={ onAddAddress } {...props}>
                { children }
            </ThemedButton>
            <Dialog onClose={ onAddressDialogCancel } open={ isDialogOpen }>
                <form onSubmit={handleSubmit(onCreateAddress)}>
                    <DialogTitle>{ dialogTitle }</DialogTitle>
                    <Divider/>
                    <DialogContent>
                        <TextField
                            label={ typeLabel }
                            name="type"
                            inputRef={ register }
                            fullWidth
                        />
                        <TextField
                            label={ nameLabel }
                            name="name"
                            inputRef={ register({ required: true }) }
                            error={ !!errors.name }
                            fullWidth
                        />
                        <TextField
                            label={ addressLabel }
                            name="address"
                            inputRef={ register({ required: true }) }
                            error={ !!errors.address }
                            fullWidth
                        />
                        <TextField
                            label={ address2Label }
                            name="address2"
                            inputRef={ register }
                            error={ !!errors.address2 }
                            fullWidth
                        />
                        <TextField
                            label={ cityLabel }
                            name="city"
                            inputRef={ register({ required: true }) }
                            error={ !!errors.city }
                            fullWidth
                        />
                        <TextField
                            label={ administrativeLabel }
                            name="administrative"
                            inputRef={ register }
                            error={ !!errors.administrative }
                            fullWidth
                        />
                        <TextField
                            label={ countryLabel }
                            name="country"
                            inputRef={ register({ required: true }) }
                            error={ !!errors.country }
                            fullWidth
                        />
                        <TextField
                            label={ zipLabel }
                            name="zip"
                            inputRef={ register }
                            error={ !!errors.zip }
                            fullWidth
                        />
                        <TextField
                            label={ phoneLabel }
                            name="phone"
                            inputRef={ register }
                            error={ !!errors.phone }
                            fullWidth
                        />
                        <TextField
                            label={ emailLabel }
                            name="email"
                            inputRef={ register }
                            error={ !!errors.email }
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <ThemedButton onClick={ onAddressDialogCancel }>{cancelButtonLabel}</ThemedButton>
                        <ThemedButton type="submit">{confirmButtonLabel}</ThemedButton>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}