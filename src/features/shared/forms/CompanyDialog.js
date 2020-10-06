import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import FormDialog from '../wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import { LANGUAGE } from '../../../constants.js';

const { nameLabel } = LANGUAGE.shared.forms.companyDialog;

export default function CompanyDialog(
    { company, isOpen, titleLabel, submitLabel, onSubmit, onCancel, className }) {

    const { register, errors, handleSubmit, formState } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: company?.name,
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
            <TextField
                label={ nameLabel }
                name="name"
                inputRef={ register({ required: true }) }
                error={ !!errors.name }
                autoFocus
            />
        </FormDialog>
    )
}

CompanyDialog.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    titleLabel: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    className: PropTypes.string,
    company: PropTypes.object
};