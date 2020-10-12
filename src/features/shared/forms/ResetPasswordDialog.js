import React from 'react';
import { useForm } from 'react-hook-form';
import FormDialog from '../wrappers/FormDialog.js';
import { LANGUAGE } from '../../../app/constants.js';
import PropTypes from 'prop-types';
import SideTextField from '../inputs/SideTextField.js';

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
            <SideTextField
                label={ passwordLabel }
                name="password"
                type="password"
                inputRef={ register({ required: true }) }
                error={ !!errors.password }
                required
                fullWidth
                autoFocus
            />
            <SideTextField
                label={ newPasswordLabel }
                name="newPassword"
                type="password"
                inputRef={ register({ required: true }) }
                error={ !!errors.newPassword }
                required
                fullWidth
            />
            <SideTextField
                label={ confirmPasswordLabel }
                name="confirmPassword"
                type="password"
                inputRef={ register({ required: true }) }
                error={ !!errors.confirmPassword }
                required
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