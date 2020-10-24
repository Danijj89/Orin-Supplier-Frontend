import React, { useEffect, useRef, useState } from 'react';
import FormDialog from '../wrappers/FormDialog.js';
import { Controller, useForm } from 'react-hook-form';
import { LANGUAGE } from '../../../app/constants.js';
import SideTextField from '../inputs/SideTextField.js';
import SideAutoComplete from '../inputs/SideAutoComplete.js';
import { formatAddress } from '../utils/format.js';
import { useSelector } from 'react-redux';
import { selectCurrentCompany } from '../../home/duck/selectors.js';
import FormContainer from '../wrappers/FormContainer.js';

const {
    deleteMessage,
    orderReferenceLabel,
    companyAddressLabel,
    clientLabel,
    clientAddressLabel,
    crdLabel,
    realCrdLabel,
    incotermLabel,
    paymentMethodLabel,
    clientReferenceLabel,
    deliveryMethodLabel,
    portOfLoadingLabel,
    portOfDestinationLabel,
    shippingCarrierLabel
} = LANGUAGE.shared.forms.orderDialog;

export default function OrderDialog(
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
    const { addresses, ports } = company;

    const { register, handleSubmit, errors, control, getValues, watch, setValue, reset } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            ref: order?.ref,
            fromAdd: order?.fromAdd && addresses.find(address => address._id === order.fromAdd.addressId),
            to: order?.to && clients[order.to],
            toAdd: order?.toAdd && addresses.find(address => address._id === order.fromAdd.addressId),
            incoterm: order?.incoterm,
            crd: order?.crd,
            realCrd: order?.realCrd,
            clientRef: order?.clientRef,
            pol: order?.pol,
            pod: order?.pod,
            pay: order?.pay,
            del: order?.del,
            carrier: order?.carrier
        }
    });

    const chosenClient = watch('to');


    useEffect(() => {
        if (chosenClient && clients.hasOwnProperty(chosenClient._id)) {
            if (chosenClient.incoterm) setValue('incoterm', chosenClient.incoterm);
            if (chosenClient.payment) setValue('pay', chosenClient.payment);
            if (chosenClient.addresses) setClientAddresses(chosenClient.addresses);
        }
    }, [chosenClient, setValue, clients]);

    const [clientAddresses, setClientAddresses] = useState([]);
    console.log(getValues('fromAdd'))
    console.log(addresses)
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
            <SideTextField
                name="ref"
                label={ orderReferenceLabel }
                inputRef={ register({ required: true }) }
                error={ !!errors.name }
                required
            />
            <Controller
                render={ (props) =>
                    <SideAutoComplete
                        { ...props }
                        options={ addresses }
                        label={ companyAddressLabel }
                        error={ !!errors.fromAdd }
                        getOptionLabel={ address => formatAddress(address) }
                        getOptionSelected={ address => address._id === getValues('fromAdd')._id }
                        required
                    />
                }
                name="fromAdd"
                control={ control }
                rules={ { required: true } }
            />
            <Controller
                render={ (props) =>
                    <SideAutoComplete
                        { ...props }
                        options={ Object.values(clients) }
                        label={ clientLabel }
                        error={ !!errors.to }
                        getOptionLabel={ client => client.name }
                        getOptionSelected={ client => client._id === getValues('to')._id }
                        required
                    />
                }
                name="to"
                control={ control }
                rules={ { required: true } }
            />
            <Controller
                render={ (props) => (
                    <SideAutoComplete
                        { ...props }
                        options={ clientAddresses }
                        label={ clientAddressLabel }
                        error={ !!errors.toAdd }
                        getOptionLabel={ address => formatAddress(address) }
                        getOptionSelected={ client => client._id === getValues('toAdd')._id }
                        required
                    />
                ) }
                name="toAdd"
                control={ control }
                rules={ { required: true } }
            />
        </FormDialog>
    )
}