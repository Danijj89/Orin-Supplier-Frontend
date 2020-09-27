import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { LANGUAGE } from '../../constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddress } from './duck/thunks.js';
import { selectCurrentCompany } from './duck/slice.js';

const {
    addAddressButtonLabel,
    newAddressTitleLabel,
    typeLabel,
    nameLabel,
    addressLabel,
    address2Label,
    cityLabel,
    administrativeLabel,
    countryLabel,
    zipLabel,
    phoneLabel,
    emailLabel,
    cancelButtonLabel,
    saveButtonLabel
} = LANGUAGE.home.newAddressButton;

export default function NewAddressDialogButton() {
    const dispatch = useDispatch();
    const { _id } = useSelector(selectCurrentCompany);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { register, errors, handleSubmit } = useForm({
        mode: 'onSubmit'
    });

    const onAddAddress = () => setIsDialogOpen(true);
    const onAddressDialogCancel = () => setIsDialogOpen(false);
    const onCreateAddress = (data) => {
        data.id = _id;
        dispatch(addNewAddress(data));
        setIsDialogOpen(false);
    }

    return (
        <>
            <ThemedButton
                text={ addAddressButtonLabel }
                onClick={ onAddAddress }
            />
            <Dialog onClose={ onAddressDialogCancel } open={ isDialogOpen }>
                <form onSubmit={handleSubmit(onCreateAddress)}>
                    <DialogTitle>{ newAddressTitleLabel }</DialogTitle>
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
                        <ThemedButton text={ cancelButtonLabel } onClick={ onAddressDialogCancel }/>
                        <ThemedButton text={ saveButtonLabel } type="submit"/>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}