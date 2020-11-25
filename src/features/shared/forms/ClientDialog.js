import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import FormDialog from '../wrappers/FormDialog.js';
import { incotermOptions } from '../constants.js';
import SideTextField from '../inputs/SideTextField.js';
import { LANGUAGE } from '../../../app/utils/constants.js';
import RHFAutoComplete from '../rhf/inputs/RHFAutoComplete.js';

const {
    nameLabel,
    assignedToLabel,
    contactNameLabel,
    contactEmailLabel,
    taxNumberLabel,
    sourceLabel,
    incotermLabel,
    paymentTermLabel,
    notesLabel,
    deleteMessage
} = LANGUAGE.shared.forms.clientDialog;

export default function ClientDialog(
    {
        isOpen,
        onSubmit,
        onCancel,
        submitLabel,
        client,
        users,
        titleLabel,
        isEdit,
        onDelete
    }) {
    const { register, errors, handleSubmit, control, reset } = useForm({
        mode: 'onSubmit'
    });

    const onFormSubmit = (data) => onSubmit(data);

    useEffect(() => {
        reset({
            name: client?.name,
            assignedTo: client?.assignedTo,
            contactName: !isEdit && client?.defaultContact?.name,
            contactEmail: !isEdit && client?.defaultContact?.email,
            taxNumber: client?.taxNumber,
            source: client?.source,
            incoterm: client?.incoterm || 'FOB',
            payment: client?.payment,
            notes: !isEdit && client?.notes
        });
    }, [reset, client, isEdit]);

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
                name="name"
                label={ nameLabel }
                inputRef={ register({ required: true }) }
                error={ !!errors.name }
                required
            />
            <RHFAutoComplete
                rhfControl={ control }
                name="assignedTo"
                label={ assignedToLabel }
                options={ users }
                getOptionLabel={ option => option.name }
                getOptionSelected={ (option, value) => option._id === value._id }
            />
            { !isEdit && <SideTextField
                name="contactName"
                label={ contactNameLabel }
                inputRef={ register }
                error={ !!errors.contactName }
            /> }
            { !isEdit && <SideTextField
                name="contactEmail"
                label={ contactEmailLabel }
                inputRef={ register }
                error={ !!errors.contactEmail }
            /> }
            <SideTextField
                name="taxNumber"
                label={ taxNumberLabel }
                inputRef={ register }
                error={ !!errors.taxNumber }
            />
            <SideTextField
                name="source"
                label={ sourceLabel }
                inputRef={ register }
                error={ !!errors.source }
            />
            <RHFAutoComplete
                rhfControl={ control }
                name="incoterm"
                label={ incotermLabel }
                options={ incotermOptions }
            />
            <SideTextField
                name="payment"
                label={ paymentTermLabel }
                inputRef={ register }
                error={ !!errors.payment }
            />
            { !isEdit && <SideTextField
                name="notes"
                multiline
                rows={ 4 }
                rowsMax={ 8 }
                label={ notesLabel }
                inputRef={ register }
                error={ !!errors.notes }
            /> }
        </FormDialog>
    )
}

ClientDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    titleLabel: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
    client: PropTypes.object,
    isEdit: PropTypes.bool,
    onDelete: PropTypes.func
};