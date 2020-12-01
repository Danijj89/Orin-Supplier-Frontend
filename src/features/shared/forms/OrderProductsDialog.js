import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import FormDialog from '../wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import RHFProductTable, { validateItems } from '../rhf/forms/RHFProductTable.js';

const productTableFieldNames = {
    custom1: 'custom1',
    custom2: 'custom2',
    currency: 'currency',
    items: 'items',
    quantity: 'totalQ',
    total: 'totalA',
    marks: 'marks'
};

const OrderProductsDialog = React.memo(function OrderProductsDialog(
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
    const { register, errors, control, setValue, getValues, handleSubmit, reset } = rhfMethods;

    const mounted = useRef(false);
    useEffect(() => {
        if (mounted.current) {
            register({ name: productTableFieldNames.items }, { validate: validateItems });
            register({ name: productTableFieldNames.custom1 });
            register({ name: productTableFieldNames.custom2 });
            register({ name: productTableFieldNames.quantity });
            register({ name: productTableFieldNames.total });
        }
        mounted.current = true;
    }, [register]);

    useEffect(() => {
        reset({
            [productTableFieldNames.custom1]: order.custom1,
            [productTableFieldNames.custom2]: order.custom2,
            [productTableFieldNames.items]: order.items,
            [productTableFieldNames.quantity]: order.totalQ,
            [productTableFieldNames.total]: order.totalA,
            [productTableFieldNames.currency]: order.currency
        });
    }, [reset, order]);

    return (
        <FormDialog
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onSubmit) }
        >
            <RHFProductTable
                rhfRegister={ register }
                rhfErrors={ errors }
                rhfControl={ control }
                rhfSetValue={ setValue }
                rhfGetValues={ getValues }
                fieldNames={ productTableFieldNames }
                isEdit
            />
        </FormDialog>
    )
});

OrderProductsDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    titleLabel: PropTypes.string.isRequired,
    order: PropTypes.object
};

export default OrderProductsDialog;

