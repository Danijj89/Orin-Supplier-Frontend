import React from 'react';
import ButtonWithDialog from '../shared/components/ButtonWithDialog.js';
import { LANGUAGE } from '../../constants.js';
import { useForm } from 'react-hook-form';
import TextField from '../shared/inputs/TextField.js';
import FormContainer from '../shared/components/FormContainer.js';
import { useDispatch } from 'react-redux';
import { createClient } from './duck/thunks.js';

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
} = LANGUAGE.client.clientOverview;

export default function ClientFormButton({ userId, companyId, client }) {
    const dispatch = useDispatch();
    const { register, errors, formState, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            name: client?.name,
            assignedTo: client?.assignedTo,
            contactName: client?.contact.name,
            contactEmail: client?.contact.email,
            taxNumber: client?.taxNumber,
            source: client?.source,
            incoterm: client?.incoterm,
            payment: client?.payment,
            createdBy: userId,
            clientOf: companyId,
            clientSince: new Date()
        }
    });

    const onSubmit = (data) => {
        dispatch(createClient(data))
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
                <TextField
                    name="assignedTo"
                    label={ newClientAssignedToLabel }
                    inputRef={ register }
                    error={ !!errors.assignedTo }
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
                <TextField
                    name="incoterm"
                    label={ newClientIncotermLabel }
                    inputRef={ register }
                    error={ !!errors.incoterm }
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