import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LANGUAGE } from '../../../app/constants.js';
import { useForm } from 'react-hook-form';
import FormDialog from '../wrappers/FormDialog.js';
import SideTextField from '../inputs/SideTextField.js';

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
    deleteMessage
} = LANGUAGE.shared.forms.addressDialog;

export default function AddressDialog({ isOpen, onSubmit, onCancel, submitLabel, address, titleLabel, onDelete }) {
    const { register, errors, handleSubmit, formState, reset } = useForm({
        mode: 'onChange'
    });
    const { isValid } = formState;
    const onFormSubmit = (data) => {
        if (isValid) onSubmit(data);
    };

    useEffect(() => {
        reset({
            _id: address?._id,
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
        });
    }, [reset, address]);

    return (
        <FormDialog
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onFormSubmit) }
            onDelete={ onDelete }
            deleteMessage={ deleteMessage }
        >
            <SideTextField
                label={ typeLabel }
                name="type"
                inputRef={ register }
                fullWidth
            />
            <SideTextField
                label={ nameLabel }
                name="name"
                inputRef={ register({ required: true }) }
                error={ !!errors.name }
                required
                fullWidth
            />
            <SideTextField
                label={ addressLabel }
                name="address"
                inputRef={ register({ required: true }) }
                error={ !!errors.address }
                required
                fullWidth
            />
            <SideTextField
                label={ address2Label }
                name="address2"
                inputRef={ register }
                error={ !!errors.address2 }
                fullWidth
            />
            <SideTextField
                label={ cityLabel }
                name="city"
                inputRef={ register({ required: true }) }
                error={ !!errors.city }
                required
                fullWidth
            />
            <SideTextField
                label={ administrativeLabel }
                name="administrative"
                inputRef={ register }
                error={ !!errors.administrative }
                fullWidth
            />
            <SideTextField
                label={ countryLabel }
                name="country"
                inputRef={ register({ required: true }) }
                error={ !!errors.country }
                required
                fullWidth
            />
            <SideTextField
                label={ zipLabel }
                name="zip"
                inputRef={ register }
                error={ !!errors.zip }
                fullWidth
            />
            <SideTextField
                label={ phoneLabel }
                name="phone"
                inputRef={ register }
                error={ !!errors.phone }
                fullWidth
            />
            <SideTextField
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
    address: PropTypes.object,
    onDelete: PropTypes.func
};