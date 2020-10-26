import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { LANGUAGE } from '../../../app/constants.js';
import SideTextField from '../inputs/SideTextField.js';
import SideAutoComplete from '../inputs/SideAutoComplete.js';
import { formatAddress } from '../utils/format.js';
import SideDateField from '../inputs/SideDateField.js';
import { deliveryMethodOptions, incotermOptions } from '../constants.js';
import FormContainer from '../wrappers/FormContainer.js';
import { Box, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SideCheckBox from '../inputs/SideCheckBox.js';
import SideTextArea from '../inputs/SideTextArea.js';
import PropTypes from 'prop-types';

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
}));

const {
    detailsTitleLabel,
    autoGenerateRefLabel,
    orderReferenceLabel,
    dateLabel,
    companyAddressLabel,
    clientLabel,
    clientAddressLabel,
    crdLabel,
    realCrdLabel,
    incotermLabel,
    paymentMethodLabel,
    clientReferenceLabel,
    notesLabel,
    shippingInfoTitleLabel,
    deliveryMethodLabel,
    portOfLoadingLabel,
    portOfDestinationLabel,
    shippingCarrierLabel
} = LANGUAGE.shared.rhfForms.rhfOrderDetails;

export default function RHFOrderDetails({ rhfMethods, isEdit, company, clientsMap }) {
    const classes = useStyles();
    const { addresses, ports } = company;
    const { register, errors, control, getValues, watch, setValue } = rhfMethods;
    const [clientAddresses, setClientAddresses] = useState([]);
    const chosenClient = watch('to');
    const autoGenerateRef = watch('autoGenerateRef');

    useEffect(() => {
        if (chosenClient && clientsMap.hasOwnProperty(chosenClient._id)) {
            if (chosenClient.incoterm) setValue('incoterm', chosenClient.incoterm);
            if (chosenClient.payment) setValue('pay', chosenClient.payment);
            if (chosenClient.addresses) setClientAddresses(chosenClient.addresses);
        }
    }, [chosenClient, setValue, clientsMap]);

    return (
        <Box className={ classes.container }>
            <Box className={ classes.details }>
                { !isEdit && <Typography variant="h5">{ detailsTitleLabel }</Typography> }
                <FormContainer>
                    { !isEdit &&
                    <Controller
                        render={ ({ value, ...rest }) =>
                            <SideCheckBox
                                { ...rest }
                                label={ autoGenerateRefLabel }
                                checked={ value }
                            />
                        }
                        name="autoGenerateRef"
                        control={ control }
                    /> }
                    <SideTextField
                        name="ref"
                        label={ orderReferenceLabel }
                        inputRef={ register({ required: !autoGenerateRef }) }
                        error={ !!errors.name }
                        required={ !autoGenerateRef }
                        disabled={ isEdit || autoGenerateRef }
                    />
                    { !isEdit &&
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
                    /> }
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
                                options={ Object.values(clientsMap) }
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
                    { isEdit &&
                    <Controller
                        render={ props =>
                            <SideDateField
                                { ...props }
                                label={ realCrdLabel }
                            />
                        }
                        name="realCrd"
                        control={ control }
                    /> }
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
                    { !isEdit &&
                    <SideTextArea
                        label={ notesLabel }
                        name="notes"
                        inputRef={ register }
                        rows={ 4 }
                        rowsMax={ 8 }
                    /> }
                </FormContainer>
            </Box>
            <Divider orientation="vertical" flexItem/>
            <Box className={ classes.shipping }>
                { !isEdit && <Typography variant="h5">{ shippingInfoTitleLabel }</Typography> }
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
        </Box>
    )
}

RHFOrderDetails.propTypes = {
    rhfMethods: PropTypes.object.isRequired,
    company: PropTypes.object.isRequired,
    clientsMap: PropTypes.object.isRequired,
    isEdit: PropTypes.bool
};