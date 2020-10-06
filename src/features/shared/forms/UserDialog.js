import React from 'react';
import { useForm } from 'react-hook-form';
import FormDialog from '../wrappers/FormDialog.js';
import { LANGUAGE } from '../../../constants.js';
import PropTypes from 'prop-types';
import SideTextField from '../inputs/SideTextField.js';

const { nameLabel, emailLabel } = LANGUAGE.shared.forms.userDialog;

export default function UserDialog(
    { user, isOpen, titleLabel, submitLabel, onSubmit, onCancel, className }) {

    const { register, errors, handleSubmit, formState } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: user?.name,
            email: user?.email
        },
        shouldUnregister: false
    });

    const { isValid } = formState;
    const onFormSubmit = (data) => {
        if (isValid) onSubmit(data);
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