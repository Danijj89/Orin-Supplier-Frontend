import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LANGUAGE } from '../../../app/constants.js';
import { useForm } from 'react-hook-form';
import FormDialog from '../wrappers/FormDialog.js';
import SideTextField from '../inputs/SideTextField.js';

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

const ContactDialog = React.memo(function ContactDialog(
    {
        isOpen,
        onSubmit,
        onCancel,
        submitLabel,
        contact,
        titleLabel,
        onDelete
    }) {
    const { register, handleSubmit, reset } = useForm({
        mode: 'onSubmit'
    });

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
            onSubmit={ handleSubmit(onSubmit) }
            onDelete={ onDelete }
            deleteMessage={ deleteMessage }
        >
            <SideTextField
                label={ nameLabel }
                name="name"
                inputRef={ register }
            />
            <SideTextField
                label={ emailLabel }
                name="email"
                inputRef={ register }
            />
            <SideTextField
                label={ phoneLabel }
                name="phone"
                inputRef={ register }
            />
            <SideTextField
                label={ faxLabel }
                name="fax"
                inputRef={ register }
            />
            <SideTextField
                label={ titleFieldLabel }
                name="title"
                inputRef={ register }
            />
            <SideTextField
                label={ departmentLabel }
                name="department"
                inputRef={ register }
            />
            <SideTextField
                label={ additionalLabel }
                name="additional"
                inputRef={ register }
                rows={ 4 }
                rowsMax={ 8 }
            />
        </FormDialog>
    )
});

ContactDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    titleLabel: PropTypes.string.isRequired,
    contact: PropTypes.object,
    onDelete: PropTypes.func
};

export default ContactDialog;