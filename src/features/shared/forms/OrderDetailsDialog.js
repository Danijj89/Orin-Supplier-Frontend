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
    fromAdd: 'fromAdd',
    to: 'to',
    toAdd: 'toAdd',
    crd: 'crd',
    incoterm: 'incoterm',
    pay: 'pay',
    clientRef: 'clientRef',
    shipAdd: 'shipAdd',
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

    const initialCompanyAddress = companyAddresses.find(a => a._id === order.fromAdd?.addressId);
    const client = order.to ? clientsMap[order.to] : null;
    const initialClientAddress = client
        ? client.addresses.find(a => a._id === order.toAdd?.addressId)
        : null;
    const initialClientShipAddress = client
        ? client.addresses.find(a => a._id === order.shipAdd?.addressId)
        : null;

    useEffect(() => {
        reset({
            [orderDetailsFieldNames.ref]: order.ref,
            [orderDetailsFieldNames.fulfilled]: order.fulfilled,
            [orderDetailsFieldNames.fromAdd]: initialCompanyAddress,
            [orderDetailsFieldNames.to]: client,
            [orderDetailsFieldNames.toAdd]: initialClientAddress,
            [orderDetailsFieldNames.incoterm]: order.incoterm,
            [orderDetailsFieldNames.crd]: order.crd || null,
            [orderDetailsFieldNames.realCrd]: order.realCrd || null,
            [orderDetailsFieldNames.clientRef]: order.clientRef,
            [orderDetailsFieldNames.shipAdd]: initialClientShipAddress,
            [orderDetailsFieldNames.pol]: order.pol || null,
            [orderDetailsFieldNames.pod]: order.pod || null,
            [orderDetailsFieldNames.pay]: order.pay,
            [orderDetailsFieldNames.del]: order.del,
            [orderDetailsFieldNames.carrier]: order.carrier
        });
    }, [reset, order, initialClientAddress, initialCompanyAddress, client]);

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
            <RHFOrderDetails
                rhfRegister={ register }
                rhfErrors={ errors }
                rhfControl={ control }
                rhfGetValues={ getValues }
                rhfSetValue={ setValue }
                companyAddresses={ companyAddresses }
                companyPorts={ companyPorts }
                clientsMap={ clientsMap }
                fieldNames={ orderDetailsFieldNames }
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