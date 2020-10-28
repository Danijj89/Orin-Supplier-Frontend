import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormDialog from '../wrappers/FormDialog.js';
import { LANGUAGE } from '../../../app/constants.js';
import PropTypes from 'prop-types';
import SideTextField from '../inputs/SideTextField.js';

const { nameLabel, emailLabel } = LANGUAGE.shared.forms.userDialog;

export default function UserDialog(
    { user, isOpen, titleLabel, submitLabel, onSubmit, onCancel, className }) {

    const { register, errors, handleSubmit, reset } = useForm({
        mode: 'onSubmit'
    });

    const onFormSubmit = (data) => onSubmit(data);

    useEffect(() => {
        reset({
            name: user?.name,
            email: user?.email
        });
    }, [reset, user]);

    return (
        <FormDialog
            className={ className }
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onFormSubmit) }
        >
            <SideTextField
                label={ nameLabel }
                name="name"
                inputRef={ register({ required: true }) }
                error={ !!errors.name }
                required
                autoFocus
            />
            <SideTextField
                label={ emailLabel }
                name="email"
                inputRef={ register({ required: true }) }
                required
                error={ !!errors.email }
            />
        </FormDialog>
    )
}

FormDialog.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    titleLabel: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    className: PropTypes.string,
    user: PropTypes.object
};