import React, { useEffect } from 'react';
import FormDialog from '../wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import { LANGUAGE } from '../../../app/utils/constants.js';
import RHFOrderDetails from '../rhf/forms/RHFOrderDetails.js';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectCompanyActiveAddresses, selectCompanyAddress, selectCompanyPorts } from '../../home/duck/selectors.js';
import {
    selectAllActiveClients,
    selectClientAddress,
    selectClientById
} from '../../clients/duck/selectors.js';

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
    archived: 'archived',
    realCrd: 'realCrd'
};

const OrderDetailsDialog = React.memo(function OrderDetailsDialog(
    {
        isOpen,
        onSubmit,
        onCancel,
        submitLabel,
        order,
        titleLabel,
        onDelete
    }) {
    const companyAddresses = useSelector(selectCompanyActiveAddresses);
    const companyAddress = useSelector(state => selectCompanyAddress(state, order.fromAdd.addressId));
    const companyPorts = useSelector(selectCompanyPorts);
    const clients = useSelector(selectAllActiveClients);

    const initialClient = useSelector(state => selectClientById(state, order.to));
    const initialClientAddress = useSelector(
        state => selectClientAddress(state,
            { clientId: order.to, addressId: order.toAdd.addressId }
        )
    );
    const initialClientShipAddress = useSelector(
        state => selectClientAddress(state,
            { clientId: order.to, addressId: order.shipAdd?.addressId }
        )
    );

    const { register, control, getValues, setValue, errors, handleSubmit, reset } = useForm({
        mode: 'onSubmit'
    });

    useEffect(() => {
        reset({
            [orderDetailsFieldNames.ref]: order.ref,
            [orderDetailsFieldNames.archived]: order.archived,
            [orderDetailsFieldNames.fromAdd]: companyAddress,
            [orderDetailsFieldNames.to]: initialClient,
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
    }, [
        reset,
        order,
        companyAddress,
        initialClient,
        initialClientAddress,
        initialClientShipAddress
    ]);

    return (
        <FormDialog
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onSubmit) }
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
                clients={ clients }
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
    onDelete: PropTypes.func
};

export default OrderDetailsDialog;