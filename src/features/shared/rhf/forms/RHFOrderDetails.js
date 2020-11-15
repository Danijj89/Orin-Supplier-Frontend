import React, { useEffect, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { LANGUAGE } from '../../../../app/constants.js';
import SideTextField from '../../inputs/SideTextField.js';
import SideAutoComplete from '../../inputs/SideAutoComplete.js';
import { formatAddress } from '../../utils/format.js';
import SideDateField from '../../inputs/SideDateField.js';
import { deliveryMethodOptions, incotermOptions } from '../../constants.js';
import FormContainer from '../../wrappers/FormContainer.js';
import { Divider, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SideTextArea from '../../inputs/SideTextArea.js';
import PropTypes from 'prop-types';
import NewClientAddressButton from '../../buttons/NewClientAddressButton.js';
import CheckBox from '../../inputs/CheckBox.js';

const useStyles = makeStyles((theme) => ({
    details: {
        padding: theme.spacing(2)
    },
    shipping: {
        padding: theme.spacing(2)
    }
}));

const {
    detailsTitleLabel,
    shippingInfoTitleLabel,
    formLabels
} = LANGUAGE.shared.rhf.forms.orderDetails;

const RHFOrderDetails = React.memo(function RHFOrderDetails(
    {
        rhfRegister: register,
        rhfErrors: errors,
        rhfControl: control,
        rhfGetValues: getValues,
        rhfSetValue: setValue,
        isEdit,
        companyAddresses,
        companyPorts,
        clientsMap,
        fieldNames,
        className
    }) {
    const classes = useStyles();

    const client = useWatch({
        control,
        name: fieldNames.to
    });

    const autoGenerateRef = useWatch({
        control,
        name: fieldNames.autoGenerateRef
    });

    const [clientAddresses, setClientAddresses] = useState([]);

    useEffect(() => {
        if (client && clientsMap.hasOwnProperty(client._id)) {
            if (client.incoterm) setValue(fieldNames.incoterm, client.incoterm);
            if (client.payment) setValue(fieldNames.pay, client.payment);
            if (client.addresses) setClientAddresses(client.addresses.filter(a => a.active));
        }
    }, [client, setValue, clientsMap, fieldNames]);

    const shouldShowAddAddressButton = !isEdit && client;

    return (
        <Grid container justify="center" className={ className }>
            <Grid item className={ classes.details }>
                { !isEdit && <Typography variant="h5">{ detailsTitleLabel }</Typography> }
                <FormContainer>
                    { isEdit &&
                    <CheckBox
                        inputRef={ register }
                        name={ fieldNames.fulfilled }
                        label={ formLabels.fulfilled }
                    /> }
                    { !isEdit &&
                    <CheckBox
                        name={ fieldNames.autoGenerateRef }
                        label={ formLabels.autoGenerateRef }
                        inputRef={ register }
                    /> }
                    <SideTextField
                        name={ fieldNames.ref }
                        label={ formLabels.ref }
                        inputRef={ register({ required: !autoGenerateRef }) }
                        error={ !!errors[fieldNames.ref] }
                        required={ !autoGenerateRef }
                        disabled={ isEdit || autoGenerateRef }
                    />
                    { !isEdit &&
                    <Controller
                        render={ props =>
                            <SideDateField
                                { ...props }
                                label={ formLabels.date }
                                error={ !!errors[fieldNames.date] }
                                required
                            />
                        }
                        name={ fieldNames.date }
                        control={ control }
                        rules={ { required: true } }
                    /> }
                    <Controller
                        render={ (props) =>
                            <SideAutoComplete
                                { ...props }
                                options={ companyAddresses.filter(a => a.active) }
                                label={ formLabels.fromAdd }
                                error={ !!errors[fieldNames.fromAdd] }
                                getOptionLabel={ address => formatAddress(address) }
                                getOptionSelected={ address => address._id === getValues(fieldNames.fromAdd)._id
                                    || address._id === getValues(fieldNames.fromAdd).addressId }
                                required
                                rows={ 7 }
                            />
                        }
                        name={ fieldNames.fromAdd }
                        control={ control }
                        rules={ { required: true } }
                    />
                    <Controller
                        render={ (props) =>
                            <SideAutoComplete
                                { ...props }
                                options={ Object.values(clientsMap).filter(c => c.active) }
                                label={ formLabels.to }
                                error={ !!errors[fieldNames.to] }
                                getOptionLabel={ client => client.name }
                                getOptionSelected={ client => client._id === getValues(fieldNames.to)._id }
                                required
                            />
                        }
                        name={ fieldNames.to }
                        control={ control }
                        rules={ { required: true } }
                    />
                    <Controller
                        render={ (props) => (
                            <SideAutoComplete
                                { ...props }
                                options={ clientAddresses }
                                label={ formLabels.toAdd }
                                error={ !!errors[fieldNames.toAdd] }
                                getOptionLabel={ address => formatAddress(address) }
                                getOptionSelected={ address => address._id === getValues(fieldNames.toAdd)._id
                                    || address._id === getValues(fieldNames.toAdd).addressId }
                                required
                                rows={ 7 }
                            />
                        ) }
                        name={ fieldNames.toAdd }
                        control={ control }
                        rules={ { required: true } }
                    />
                    { shouldShowAddAddressButton && <NewClientAddressButton client={ client }/> }
                    <Controller
                        render={ props =>
                            <SideDateField
                                { ...props }
                                label={ formLabels.crd }
                            />
                        }
                        name={ fieldNames.crd }
                        control={ control }
                    />
                    { isEdit &&
                    <Controller
                        render={ props =>
                            <SideDateField
                                { ...props }
                                label={ formLabels.realCrd }
                            />
                        }
                        name={ fieldNames.realCrd }
                        control={ control }
                    /> }
                    <Controller
                        render={ (props) => (
                            <SideAutoComplete
                                { ...props }
                                options={ incotermOptions }
                                label={ formLabels.incoterm }
                            />
                        ) }
                        name={ fieldNames.incoterm }
                        control={ control }
                    />
                    <SideTextField
                        label={ formLabels.pay }
                        name={ fieldNames.pay }
                        inputRef={ register }
                    />
                    <SideTextField
                        label={ formLabels.clientRef }
                        name={ fieldNames.clientRef }
                        inputRef={ register }
                    />
                    { !isEdit &&
                    <SideTextArea
                        label={ formLabels.notes }
                        name={ fieldNames.notes }
                        inputRef={ register }
                        rows={ 4 }
                        rowsMax={ 8 }
                    /> }
                </FormContainer>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item className={ classes.shipping }>
                { !isEdit && <Typography variant="h5">{ shippingInfoTitleLabel }</Typography> }
                <FormContainer>
                    <Controller
                        render={ (props) => (
                            <SideAutoComplete
                                { ...props }
                                options={ clientAddresses }
                                label={ formLabels.shipAdd }
                                getOptionLabel={ address => formatAddress(address) }
                                getOptionSelected={ address => address._id === getValues(fieldNames.shipAdd)._id
                                    || address._id === getValues(fieldNames.shipAdd).addressId }
                                rows={ 7 }
                            />
                        ) }
                        name={ fieldNames.shipAdd }
                        control={ control }
                    />
                    <Controller
                        render={ (props) => (
                            <SideAutoComplete
                                { ...props }
                                options={ deliveryMethodOptions }
                                label={ formLabels.del }
                            />
                        ) }
                        name={ fieldNames.del }
                        control={ control }
                    />
                    <Controller
                        render={ (props) => (
                            <SideAutoComplete
                                { ...props }
                                freeSolo
                                autoSelect
                                options={ companyPorts }
                                label={ formLabels.pol }
                            />
                        ) }
                        name={ fieldNames.pol }
                        control={ control }
                    />
                    <Controller
                        render={ (props) => (
                            <SideAutoComplete
                                { ...props }
                                freeSolo
                                autoSelect
                                options={ companyPorts }
                                label={ formLabels.pod }
                            />
                        ) }
                        name={ fieldNames.pod }
                        control={ control }
                    />
                    <SideTextField
                        label={ formLabels.carrier }
                        name={ fieldNames.carrier }
                        inputRef={ register }
                    />
                </FormContainer>
            </Grid>
        </Grid>
    )
});

RHFOrderDetails.propTypes = {
    rhfRegister: PropTypes.func.isRequired,
    rhfErrors: PropTypes.object.isRequired,
    rhfControl: PropTypes.object.isRequired,
    rhfGetValues: PropTypes.func.isRequired,
    rhfSetValue: PropTypes.func.isRequired,
    companyAddresses: PropTypes.array.isRequired,
    companyPorts: PropTypes.array.isRequired,
    clientsMap: PropTypes.object.isRequired,
    fieldNames: PropTypes.exact({
        ref: PropTypes.string.isRequired,
        fromAdd: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        toAdd: PropTypes.string.isRequired,
        crd: PropTypes.string.isRequired,
        incoterm: PropTypes.string.isRequired,
        pay: PropTypes.string.isRequired,
        clientRef: PropTypes.string.isRequired,
        shipAdd: PropTypes.string.isRequired,
        del: PropTypes.string.isRequired,
        pol: PropTypes.string.isRequired,
        pod: PropTypes.string.isRequired,
        carrier: PropTypes.string.isRequired,
        date: PropTypes.string,
        notes: PropTypes.string,
        autoGenerateRef: PropTypes.string,
        fulfilled: PropTypes.string,
        realCrd: PropTypes.string
    }).isRequired,
    isEdit: PropTypes.bool,
    className: PropTypes.string
};

// RHFOrderDetails.whyDidYouRender = true;

export default RHFOrderDetails;