import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import FormDialog from '../wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import RHFProductTable, { validateItems } from '../rhf/forms/RHFProductTable.js';
import { useSelector } from 'react-redux';
import { selectActiveProducts } from '../../products/duck/selectors.js';

const productTableFieldNames = {
    custom1: 'custom1',
    custom2: 'custom2',
    currency: 'currency',
    items: 'items',
    quantity: 'totalQ',
    total: 'totalA'
};

export default function OrderProductsDialog(
    {
        isOpen,
        onSubmit,
        onCancel,
        submitLabel,
        order,
        titleLabel
    }) {
    const products = useSelector(selectActiveProducts);
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
    const { register, errors, control, setValue, getValues, handleSubmit, reset } = rhfMethods;

    const onFormSubmit = data => onSubmit(data);

    useEffect(() => {
        register({ name: productTableFieldNames.items }, { validate: validateItems });
        register({ name: productTableFieldNames.custom1 });
        register({ name: productTableFieldNames.custom2 });
        register({ name: productTableFieldNames.quantity });
        register({ name: productTableFieldNames.total });
    }, [register]);

    useEffect(() => {
        reset({
            custom1: order.custom1,
            custom2: order.custom2,
            items: order.items,
            totalQ: order.totalQ,
            totalA: order.totalA,
            currency: order.currency
        });
    }, [reset, order]);

    return (
        <FormDialog
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onFormSubmit) }
        >
            <RHFProductTable
                rhfErrors={ errors }
                rhfControl={ control }
                rhfSetValue={ setValue }
                rhfGetValues={ getValues }
                rhfReset={ reset }
                fieldNames={ productTableFieldNames }
                products={ products }
            />
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

