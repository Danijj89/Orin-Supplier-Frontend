import React from 'react';
import FormDialog from '../wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import RHFOrderProducts from './RHFOrderProducts.js';


export default function RHFOrderProductsDialog(
    {
        isOpen,
        onSubmit,
        onCancel,
        submitLabel,
        order,
        titleLabel,
    }) {

    const rhfMethods = useForm({
        mode: 'onSubmit',
        defaultValues: {
            custom1: order.custom1,
            custom2: order.custom2,
            items: order.items,
            totalQ: order.totalQ,
            totalA: order.totalA,
            currency: order.currency
        }
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
        >
            <RHFOrderProducts rhfMethods={ rhfMethods } isEdit/>
        </FormDialog>
    )
}