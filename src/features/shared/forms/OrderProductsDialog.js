import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import FormDialog from '../wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import RHFOrderProducts from '../rhf/forms/RHFOrderProducts.js';

export default function OrderProductsDialog(
    {
        isOpen,
        onSubmit,
        onCancel,
        submitLabel,
        order,
        titleLabel
    }) {

    const rhfMethods = useForm({
        mode: 'onSubmit'
    });
    const { handleSubmit, reset } = rhfMethods;

    const onFormSubmit = data => onSubmit(data);

    useEffect(() => {
        reset({
            custom1: order.custom1,
            custom2: order.custom2,
            items: order.items,
            totalQ: order.totalQ,
            totalA: order.totalA,
            currency: order.currency
        })
    }, [reset, order]);

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

OrderProductsDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    titleLabel: PropTypes.string.isRequired,
    order: PropTypes.object
};

