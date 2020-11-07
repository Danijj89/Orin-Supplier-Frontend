import React, { useEffect } from 'react';
import FormDialog from '../wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import { LANGUAGE } from '../../../app/constants.js';
import RHFOrderDetails from '../rhf/forms/RHFOrderDetails.js';
import PropTypes from 'prop-types';

const {
    deleteMessage
} = LANGUAGE.shared.forms.orderDetailsDialog;

const orderDetailsFieldNames = {
    ref: 'ref',
    date: 'date',
    fromAdd: 'fromAdd',
    to: 'to',
    toAdd: 'toAdd',
    crd: 'crd',
    incoterm: 'incoterm',
    pay: 'pay',
    clientRef: 'clientRef',
    notes: 'notes',
    del: 'del',
    pol: 'pol',
    pod: 'pod',
    carrier: 'carrier',
    fulfilled: 'fulfilled',
    realCrd: 'realCrd'
};

const OrderDetailsDialog = React.memo(function OrderDetailsDialog(
    {
        isOpen,
        onSubmit,
        onCancel,
        submitLabel,
        order,
        companyAddresses,
        companyPorts,
        clientsMap,
        titleLabel,
        onDelete
    }) {

    const rhfMethods = useForm({
        mode: 'onSubmit'
    });

    const { register, control, setValue, getValues, errors, handleSubmit, reset } = rhfMethods;

    const onFormSubmit = data => onSubmit(data);

    useEffect(() => {
        reset({
            ref: order?.ref,
            fulfilled: order?.fulfilled,
            fromAdd: order?.fromAdd,
            to: order?.to && clientsMap[order.to],
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
        });
    }, [reset, order, clientsMap]);

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
            <RHFOrderDetails
                rhfRegister={ register }
                rhfErrors={errors}
                rhfControl={control}
                rhfGetValues={getValues}
                rhfSetValue={setValue}
                companyAddresses={companyAddresses}
                companyPorts={companyPorts}
                clientsMap={clientsMap}
                fieldNames={orderDetailsFieldNames}
                isEdit
            />
        </FormDialog>
    )
});

OrderDetailsDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    titleLabel: PropTypes.string.isRequired,
    order: PropTypes.object,
    companyAddresses: PropTypes.array.isRequired,
    companyPorts: PropTypes.array.isRequired,
    clientsMap: PropTypes.object.isRequired,
    onDelete: PropTypes.func
};

export default OrderDetailsDialog;