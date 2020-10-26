import React from 'react';
import FormDialog from '../wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import { LANGUAGE } from '../../../app/constants.js';
import RHFOrderDetails from '../rhf_forms/RHFOrderDetails.js';

const {
    deleteMessage
} = LANGUAGE.shared.forms.orderDetailsDialog;

export default function OrderDetailsDialog(
    {
        isOpen,
        onSubmit,
        onCancel,
        submitLabel,
        order,
        company,
        clients,
        titleLabel,
        onDelete
    }) {

    const rhfMethods = useForm({
        mode: 'onSubmit',
        defaultValues: {
            ref: order?.ref,
            fromAdd: order?.fromAdd,
            to: order?.to && clients[order.to],
            toAdd: order?.toAdd,
            incoterm: order?.incoterm,
            crd: order?.crd,
            realCrd: order?.realCrd,
            clientRef: order?.clientRef,
            pol: order?.pol,
            pod: order?.pod,
            pay: order?.pay,
            del: order?.del,
            carrier: order?.carrier
        },
        shouldUnregister: false
    });

    const { handleSubmit } = rhfMethods;

    const onFormSubmit = data => onSubmit(data);

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
            <RHFOrderDetails rhfMethods={ rhfMethods } company={company} clients={clients} isEdit/>
        </FormDialog>
    )
}