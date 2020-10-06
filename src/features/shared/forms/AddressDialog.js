import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { LANGUAGE } from '../../../constants.js';
import { useForm } from 'react-hook-form';
import FormDialog from '../wrappers/FormDialog.js';

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
    emailLabel,
} = LANGUAGE.shared.forms.addressDialog;

export default function AddressDialog({ isOpen, onSubmit, onCancel, submitLabel, address, titleLabel }) {
    const { register, errors, handleSubmit, formState, reset } = useForm({
        mode: 'onChange',
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

    const onFormSubmit = (data) => {
        if (formState.isValid) onSubmit(data);
    };

    useEffect(() => {
        reset(address);
    }, [reset, address]);

    return (
        <FormDialog
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onFormSubmit) }
        >
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
        </FormDialog>
    )
}

AddressDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    titleLabel: PropTypes.string.isRequired,
    address: PropTypes.object
};