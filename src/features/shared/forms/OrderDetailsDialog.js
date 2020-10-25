import React, { useEffect, useState } from 'react';
import FormDialog from '../wrappers/FormDialog.js';
import { Controller, useForm } from 'react-hook-form';
import { LANGUAGE } from '../../../app/constants.js';
import SideTextField from '../inputs/SideTextField.js';
import SideAutoComplete from '../inputs/SideAutoComplete.js';
import { formatAddress } from '../utils/format.js';
import SideDateField from '../inputs/SideDateField.js';
import { deliveryMethodOptions, incotermOptions } from '../constants.js';
import FormContainer from '../wrappers/FormContainer.js';
import { Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        display: 'flex'
    }
}));

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
    const classes = useStyles();
    const { addresses, ports } = company;

    const { register, handleSubmit, errors, control, getValues, watch, setValue, reset } = useForm({
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

    const chosenClient = watch('to');


    useEffect(() => {
        if (chosenClient && clients.hasOwnProperty(chosenClient._id)) {
            if (chosenClient.incoterm) setValue('incoterm', chosenClient.incoterm);
            if (chosenClient.payment) setValue('pay', chosenClient.payment);
            if (chosenClient.addresses) setClientAddresses(chosenClient.addresses);
        }
    }, [chosenClient, setValue, clients]);

    const [clientAddresses, setClientAddresses] = useState([]);
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
            <Box className={ classes.formContainer }>
                <FormContainer>
                    <SideTextField
                        name="ref"
                        label={ orderReferenceLabel }
                        inputRef={ register({ required: true }) }
                        error={ !!errors.name }
                        required
                        disabled
                    />
                    <Controller
                        render={ (props) =>
                            <SideAutoComplete
                                { ...props }
                                options={ addresses }
                                label={ companyAddressLabel }
                                error={ !!errors.fromAdd }
                                getOptionLabel={ address => formatAddress(address) }
                                getOptionSelected={ address => address._id === getValues('fromAdd')._id
                                    || address._id === getValues('fromAdd').addressId }
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
                                getOptionSelected={ address => address._id === getValues('toAdd')._id
                                    || address._id === getValues('toAdd').addressId }
                                required
                            />
                        ) }
                        name="toAdd"
                        control={ control }
                        rules={ { required: true } }
                    />
                    <Controller
                        render={ props =>
                            <SideDateField
                                { ...props }
                                label={ crdLabel }
                            />
                        }
                        name="crd"
                        control={ control }
                    />
                    <Controller
                        render={ props =>
                            <SideDateField
                                { ...props }
                                label={ realCrdLabel }
                            />
                        }
                        name="realCrd"
                        control={ control }
                    />
                    <Controller
                        render={ (props) => (
                            <SideAutoComplete
                                { ...props }
                                options={ incotermOptions }
                                label={ incotermLabel }
                            />
                        ) }
                        name="incoterm"
                        control={ control }
                    />
                    <SideTextField
                        label={ paymentMethodLabel }
                        name="pay"
                        inputRef={ register }
                    />
                    <SideTextField
                        label={ clientReferenceLabel }
                        name="clientRef"
                        inputRef={ register }
                    />
                </FormContainer>
                <Divider orientation="vertical" flexItem/>
                <FormContainer>
                    <Controller
                        render={ (props) => (
                            <SideAutoComplete
                                { ...props }
                                options={ deliveryMethodOptions }
                                label={ deliveryMethodLabel }
                            />
                        ) }
                        name="del"
                        control={ control }
                    />
                    <Controller
                        render={ (props) => (
                            <SideAutoComplete
                                { ...props }
                                freeSolo
                                autoSelect
                                options={ ports }
                                label={ portOfLoadingLabel }
                            />
                        ) }
                        name="pol"
                        control={ control }
                    />
                    <Controller
                        render={ (props) => (
                            <SideAutoComplete
                                { ...props }
                                freeSolo
                                autoSelect
                                options={ ports }
                                label={ portOfDestinationLabel }
                            />
                        ) }
                        name="pod"
                        control={ control }
                    />
                    <SideTextField
                        label={ shippingCarrierLabel }
                        name="carrier"
                        inputRef={ register }
                    />
                </FormContainer>
            </Box>
        </FormDialog>
    )
}