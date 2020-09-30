import React from 'react';
import ButtonWithDialog from '../shared/components/ButtonWithDialog.js';
import { LANGUAGE } from '../../constants.js';
import { useForm } from 'react-hook-form';
import TextField from '../shared/inputs/TextField.js';
import FormContainer from '../shared/components/FormContainer.js';
import { useDispatch } from 'react-redux';
import { createClient } from './duck/thunks.js';
import RHFAutoComplete from '../shared/rhf/RHFAutocomplete.js';
import { incotermOptions } from '../shared/constants.js';

const {
    newClientButtonLabel,
    newClientDialogTitleLabel,
    newClientAssignedToLabel,
    newClientContactEmailLabel,
    newClientContactNameLabel,
    newClientIncotermLabel,
    newClientNameLabel,
    newClientPaymentTermLabel,
    newClientSourceLabel,
    newClientTaxNumberLabel,
    newClientConfirmButtonLabel
} = LANGUAGE.client.clientOverview.clientFormButton;

export default function ClientFormButton({ userId, companyId, client, users }) {
    const dispatch = useDispatch();
    const { register, errors, formState, handleSubmit, control } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            name: client?.name,
            assignedTo: client?.assignedTo || users.find(user => user._id === userId),
            contactName: client?.contact.name,
            contactEmail: client?.contact.email,
            taxNumber: client?.taxNumber,
            source: client?.source,
            incoterm: client?.incoterm || 'FOB',
            payment: client?.payment,
            createdBy: userId,
            clientOf: companyId,
            clientSince: new Date()
        }
    });

    const onSubmit = (data) => {
        const { contactName, contactEmail, ...client } = data;
        client.assignedTo = client.assignedTo._id;
        client.contacts = [{ name: contactName, email: contactEmail }];
        dispatch(createClient(client))
    };

    return (
        <ButtonWithDialog
            buttonLabel={ newClientButtonLabel }
            dialogTitle={ newClientDialogTitleLabel }
            isError={ !formState.isValid }
            onConfirm={ handleSubmit(onSubmit) }
            confirmButtonLabel={ newClientConfirmButtonLabel }
        >
            <FormContainer>
                <TextField
                    name="name"
                    label={ newClientNameLabel }
                    inputRef={ register({ required: true }) }
                    error={ !!errors.name }
                    required
                />
                <RHFAutoComplete
                    name="assignedTo"
                    label={ newClientAssignedToLabel }
                    error={ !!errors.assignedTo }
                    control={ control }
                    rules={ { required: true } }
                    options={ users }
                    getOptionLabel={ option => option.name }
                    defaultValue={ null }
                />
                <TextField
                    name="contactName"
                    label={ newClientContactNameLabel }
                    inputRef={ register }
                    error={ !!errors.contactName }
                />
                <TextField
                    name="contactEmail"
                    label={ newClientContactEmailLabel }
                    inputRef={ register }
                    error={ !!errors.contactEmail }
                />
                <TextField
                    name="taxNumber"
                    label={ newClientTaxNumberLabel }
                    inputRef={ register }
                    error={ !!errors.taxNumber }
                />
                <TextField
                    name="source"
                    label={ newClientSourceLabel }
                    inputRef={ register }
                    error={ !!errors.source }
                />
                <RHFAutoComplete
                    name="incoterm"
                    label={ newClientIncotermLabel }
                    error={ !!errors.incoterm }
                    control={ control }
                    rules={ { required: true } }
                    options={ incotermOptions }
                    defaultValue={ null }
                />
                <TextField
                    name="payment"
                    label={ newClientPaymentTermLabel }
                    inputRef={ register }
                    error={ !!errors.payment }
                />
            </FormContainer>
        </ButtonWithDialog>
    )
}