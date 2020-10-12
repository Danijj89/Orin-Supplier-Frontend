import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { LANGUAGE } from '../../app/constants.js';
import { Divider, Box, Typography } from '@material-ui/core';
import { formatAddress } from '../shared/utils/format.js';
import FormContainer from '../shared/wrappers/FormContainer.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import SideAutoComplete from '../shared/inputs/SideAutoComplete.js';
import { deliveryMethodOptions, incotermOptions } from '../shared/constants.js';
import TextArea from '../shared/inputs/TextArea.js';
import { makeStyles } from '@material-ui/core/styles';
import SideDateField from '../shared/inputs/SideDateField.js';
import SideCheckBox from '../shared/inputs/SideCheckBox.js';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        padding: theme.spacing(1),
    },
    details: {
        padding: theme.spacing(2)
    },
    shipping: {
        padding: theme.spacing(2)
    }
}))

const {
    detailsTitleLabel,
    autoGenerateRefLabel,
    orderReferenceLabel,
    dateLabel,
    companyAddressLabel,
    clientLabel,
    clientAddressLabel,
    crdLabel,
    incotermLabel,
    paymentMethodLabel,
    clientReferenceLabel,
    notesLabel,
    shippingInfoTitleLabel,
    deliveryMethodLabel,
    portOfLoadingLabel,
    portOfDestinationLabel,
    shippingCarrierLabel,
} = LANGUAGE.order.createOrder.createOrderDetails;

export default function CreateOrderDetails(
    { register, control, watch, setValue, getValues, errors, company, clients }) {
    const classes = useStyles();
    const [clientAddresses, setClientAddresses] = useState([]);
    const { addresses, ports } = company;

    const chosenClient = watch('to');
    const autoGenerateRef = watch('autoGenerateRef');
    console.log(autoGenerateRef)

    useEffect(() => {
        const client = clients.find(client => client._id === chosenClient?._id);
        const newAddressOptions = client?.addresses || [];
        setClientAddresses(newAddressOptions);
        if (client?.incoterm) setValue('incoterm', client?.incoterm);
    }, [chosenClient, clients, getValues, setValue]);

    return (
        <Box className={ classes.container }>
            <Box className={ classes.details }>
                <Typography variant="h5">{ detailsTitleLabel }</Typography>
                <FormContainer>
                    <SideCheckBox
                        label={ autoGenerateRefLabel }
                        name="autoGenerateRef"
                        inputRef={ register }
                    />
                    <SideTextField
                        label={ orderReferenceLabel }
                        name="ref"
                        error={ !!errors.ref }
                        inputRef={ register({ required: !autoGenerateRef }) }
                        disabled={ autoGenerateRef }
                        required={ !autoGenerateRef }
                        autoFocus
                    />
                    <Controller
                        render={ props =>
                            <SideDateField
                                { ...props }
                                label={ dateLabel }
                                error={ !!errors.date }
                                required
                            />
                        }
                        name="date"
                        control={ control }
                        rules={ { required: true } }
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
                                options={ clients }
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
                    <TextArea
                        label={ notesLabel }
                        name="notes"
                        inputRef={ register }
                        rows={ 4 }
                        rowsMax={ 8 }
                    />
                </FormContainer>
            </Box>
            <Divider orientation="vertical" flexItem/>
            <Box className={ classes.shipping }>
                <Typography variant="h5">{ shippingInfoTitleLabel }</Typography>
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
        </Box>
    )
}