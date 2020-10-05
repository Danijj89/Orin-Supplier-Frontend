import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import FormDialog from '../wrappers/FormDialog.js';
import { LANGUAGE } from '../../../constants.js';
import PropTypes from 'prop-types';

const { passwordLabel, newPasswordLabel, confirmPasswordLabel } = LANGUAGE.shared.forms.resetPasswordDialog;

export default function ResetPassWordDialog(
    { isOpen, titleLabel, submitLabel, onSubmit, onCancel, className }) {
    const { register, errors, handleSubmit, formState } = useForm({
        mode: 'onChange',
        shouldUnregister: false
    });
    const { isValid } = formState;

    const onFormSubmit = (data) => {
        if (isValid) {
            onSubmit(data);
        }
    };

    return (
        <FormDialog
            className={ className }
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onFormSubmit) }
        >
            <TextField
                label={ passwordLabel }
                name="password"
                type="password"
                inputRef={ register({ required: true }) }
                error={ !!errors.password }
                fullWidth
                autoFocus
            />
            <TextField
                label={ newPasswordLabel }
                name="newPassword"
                type="password"
                inputRef={ register({ required: true }) }
                error={ !!errors.newPassword }
                fullWidth
            />
            <TextField
                label={ confirmPasswordLabel }
                name="confirmPassword"
                type="password"
                inputRef={ register({ required: true }) }
                error={ !!errors.confirmPassword }
                fullWidth
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
};