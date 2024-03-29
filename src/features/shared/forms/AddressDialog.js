import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LANGUAGE } from 'app/utils/constants.js';
import { useForm } from 'react-hook-form';
import FormDialog from '../wrappers/FormDialog.js';
import SideTextField from '../inputs/SideTextField.js';
import RHFAutoComplete from '../rhf/inputs/RHFAutoComplete.js';
import { useSelector } from 'react-redux';
import { selectCountries } from 'app/duck/selectors.js';
import { getOptionLabel } from 'app/utils/options/getters.js';

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

const AddressDialog = React.memo(function AddressDialog({ isOpen, onSubmit, onCancel, submitLabel, address, titleLabel, onDelete }) {
    const { register, control, errors, handleSubmit, reset } = useForm({
        mode: 'onSubmit'
    });

    const countryOptions = useSelector(selectCountries);

    useEffect(() => {
        reset({
            _id: address?._id,
            type: address?.type,
            name: address?.name,
            address: address?.address,
            address2: address?.address2,
            city: address?.city,
            administrative: address?.administrative,
            country: address?.country || null,
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
            onSubmit={ handleSubmit(onSubmit) }
            onDelete={ onDelete }
            deleteMessage={ deleteMessage }
        >
            <SideTextField
                label={ typeLabel }
                name="type"
                inputRef={ register({ required: true }) }
                error={ !!errors.type }
                autoFocus
                required
            />
            <SideTextField
                label={ nameLabel }
                name="name"
                inputRef={ register({ required: true }) }
                error={ !!errors.name }
                required
            />
            <SideTextField
                label={ addressLabel }
                name="address"
                inputRef={ register({ required: true }) }
                error={ !!errors.address }
                required
            />
            <SideTextField
                label={ address2Label }
                name="address2"
                inputRef={ register }
            />
            <SideTextField
                label={ cityLabel }
                name="city"
                inputRef={ register({ required: true }) }
                error={ !!errors.city }
                required
            />
            <SideTextField
                label={ administrativeLabel }
                name="administrative"
                inputRef={ register }
            />
            <RHFAutoComplete
                rhfControl={ control }
                label={ countryLabel }
                name="country"
                options={ countryOptions }
                getOptionLabel={ option => getOptionLabel(option) }
                getOptionSelected={ (option, value) => option.id === value.id }
                error={ !!errors.country }
                required
            />
            <SideTextField
                label={ zipLabel }
                name="zip"
                inputRef={ register }
            />
            <SideTextField
                label={ phoneLabel }
                name="phone"
                inputRef={ register }
            />
            <SideTextField
                label={ emailLabel }
                name="email"
                inputRef={ register }
            />
        </FormDialog>
    )
});

AddressDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    titleLabel: PropTypes.string.isRequired,
    address: PropTypes.object,
    onDelete: PropTypes.func
};

export default AddressDialog;