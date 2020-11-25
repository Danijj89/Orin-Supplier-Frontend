import React from 'react';
import { useForm } from 'react-hook-form';
import FormDialog from '../wrappers/FormDialog.js';
import { LANGUAGE } from '../../../app/utils/constants.js';
import PropTypes from 'prop-types';
import SideTextField from '../inputs/SideTextField.js';

const { passwordLabel, newPasswordLabel, confirmPasswordLabel } = LANGUAGE.shared.forms.resetPasswordDialog;

const ResetPassWordDialog = React.memo(function ResetPassWordDialog(
    { isOpen, titleLabel, submitLabel, onSubmit, onCancel, className }) {
    const { register, errors, handleSubmit } = useForm({
        mode: 'onSubmit'
    });

    return (
        <FormDialog
            className={ className }
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onSubmit) }
        >
            <SideTextField
                label={ passwordLabel }
                name="password"
                type="password"
                inputRef={ register({ required: true }) }
                error={ !!errors.password }
                required
                autoFocus
            />
            <SideTextField
                label={ newPasswordLabel }
                name="newPassword"
                type="password"
                inputRef={ register({ required: true }) }
                error={ !!errors.newPassword }
                required
            />
            <SideTextField
                label={ confirmPasswordLabel }
                name="confirmPassword"
                type="password"
                inputRef={ register({ required: true }) }
                error={ !!errors.confirmPassword }
                required
            />
        </FormDialog>
    )
});

ResetPassWordDialog.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    titleLabel: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default ResetPassWordDialog;