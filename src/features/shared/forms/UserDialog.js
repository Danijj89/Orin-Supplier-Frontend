import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import FormDialog from '../wrappers/FormDialog.js';
import { LANGUAGE } from '../../../constants.js';
import PropTypes from 'prop-types';

const { nameLabel, emailLabel } = LANGUAGE.shared.forms.userDialog;

export default function UserDialog(
    { user, isOpen, titleLabel, submitLabel, onSubmit, onCancel, className }) {

    const { register, errors, handleSubmit, formState } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: user?.name,
            email: user?.email
        }
    });

    const onFormSubmit = () => {
        if (formState.isValid) {
            handleSubmit(onSubmit);
        }
    };

    return (
        <FormDialog
            className={className}
            isOpen={isOpen}
            titleLabel={titleLabel}
            submitLabel={submitLabel}
            onCancel={onCancel}
            onSubmit={onFormSubmit}
        >
            <TextField
                label={ nameLabel }
                name="name"
                inputRef={ register({ required: true }) }
                error={ !!errors.name }
                autoFocus
            />
            <TextField
                label={ emailLabel }
                name="email"
                inputRef={ register({ required: true }) }
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