import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LANGUAGE } from '../../../app/constants.js';
import { useForm } from 'react-hook-form';
import FormDialog from '../wrappers/FormDialog.js';
import SideTextField from '../inputs/SideTextField.js';
import SideTextArea from '../inputs/SideTextArea.js';

const {
    nameLabel,
    emailLabel,
    phoneLabel,
    faxLabel,
    titleLabel: titleFieldLabel,
    departmentLabel,
    additionalLabel,
    deleteMessage,
} = LANGUAGE.shared.forms.contactDialog;

export default function ContactDialog(
    {
        isOpen,
        onSubmit,
        onCancel,
        submitLabel,
        contact,
        titleLabel,
        onDelete
    }) {
    const { register, errors, handleSubmit, formState, reset } = useForm({
        mode: 'onChange'
    });

    const { isValid } = formState;
    const onFormSubmit = (data) => {
        if (isValid) onSubmit(data);
    };

    useEffect(() => {
        reset({
            _id: contact?._id,
            name: contact?.name,
            email: contact?.email,
            phone: contact?.phone,
            fax: contact?.fax,
            title: contact?.title,
            department: contact?.department,
            additional: contact?.additional,
        });
    }, [reset, contact]);

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
                label={ nameLabel }
                name="name"
                inputRef={ register}
                error={ !!errors.name }
                fullWidth
            />
            <SideTextField
                label={ emailLabel }
                name="email"
                inputRef={ register }
                error={ !!errors.email }
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
                label={ faxLabel }
                name="fax"
                inputRef={ register }
                error={ !!errors.fax }
                fullWidth
            />
            <SideTextField
                label={ titleFieldLabel }
                name="title"
                inputRef={ register }
                error={ !!errors.title }
                fullWidth
            />
            <SideTextField
                label={ departmentLabel }
                name="department"
                inputRef={ register }
                error={ !!errors.department }
                fullWidth
            />
            <SideTextArea
                label={ additionalLabel }
                name="additional"
                inputRef={ register }
                error={ !!errors.additional }
                rows={4}
                rowsMax={8}
                fullWidth
            />
        </FormDialog>
    )
}

ContactDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    titleLabel: PropTypes.string.isRequired,
    contact: PropTypes.object,
    onDelete: PropTypes.func
};