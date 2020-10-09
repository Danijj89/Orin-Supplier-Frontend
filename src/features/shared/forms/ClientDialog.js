import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import FormDialog from '../wrappers/FormDialog.js';
import { incotermOptions } from '../constants.js';
import SideTextField from '../inputs/SideTextField.js';
import { LANGUAGE } from '../../../constants.js';
import SideAutoComplete from '../inputs/SideAutoComplete.js';
import TextArea from '../inputs/TextArea.js';

const {
    nameLabel,
    assignedToLabel,
    contactNameLabel,
    contactEmailLabel,
    taxNumberLabel,
    sourceLabel,
    incotermLabel,
    paymentTermLabel,
    notesLabel
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
        isEdit
    }) {
    const { register, errors, formState, handleSubmit, control, reset } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: client?.name,
            assignedTo: client?.assignedTo,
            contactName: !isEdit && client?.defaultContact?.name,
            contactEmail: !isEdit && client?.defaultContact?.email,
            taxNumber: client?.taxNumber,
            source: client?.source,
            incoterm: client?.incoterm || 'FOB',
            payment: client?.payment,
            notes: client?.notes
        }
    });

    const { isValid } = formState;
    const onFormSubmit = (data) => {
        if (isValid) onSubmit(data);
    };

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
            notes: client?.notes
        });
    }, [reset, client, isEdit]);

    return (
        <FormDialog
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onFormSubmit) }
        >
            <SideTextField
                name="name"
                label={ nameLabel }
                inputRef={ register({ required: true }) }
                error={ !!errors.name }
                required
            />
            <Controller
                render={ props =>
                    <SideAutoComplete
                        { ...props }
                        label={ assignedToLabel }
                        error={ !!errors.assignedTo }
                        options={ users }
                        getOptionLabel={ option => option.name }
                    />
                }
                name="assignedTo"
                control={ control }
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
            <Controller
                render={ props =>
                    <SideAutoComplete
                        { ...props }
                        label={ incotermLabel }
                        error={ !!errors.incoterm }

                        options={ incotermOptions }
                    />
                }
                name="incoterm"
                control={ control }
            />
            <SideTextField
                name="payment"
                label={ paymentTermLabel }
                inputRef={ register }
                error={ !!errors.payment }
            />
            <TextArea
                name="notes"
                multiline
                rows={ 4 }
                rowsMax={ 8 }
                label={ notesLabel }
                inputRef={ register }
                error={ !!errors.notes }
            />
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
    isEdit: PropTypes.bool
};