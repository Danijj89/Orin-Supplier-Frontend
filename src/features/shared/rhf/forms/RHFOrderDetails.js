import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { LANGUAGE } from '../../../../app/constants.js';
import SideTextField from '../../inputs/SideTextField.js';
import { formatAddress } from '../../utils/format.js';
import { deliveryMethodOptions, incotermOptions } from '../../constants.js';
import FormContainer from '../../wrappers/FormContainer.js';
import { Divider, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SideTextArea from '../../inputs/SideTextArea.js';
import PropTypes from 'prop-types';
import NewClientAddressButton from '../../buttons/NewClientAddressButton.js';
import CheckBox from '../../inputs/CheckBox.js';
import RHFAutoComplete from '../../inputs/RHFAutoComplete.js';
import { isAddressEqualToDocAddress } from '../../utils/addresses.js';
import RHFDateField from '../../inputs/RHFDateField.js';

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

    const fromAddGetOptionSelected = useCallback(
        a => isAddressEqualToDocAddress(a, getValues(fieldNames.fromAdd)),
        [fieldNames.fromAdd, getValues]);
    const clients = useMemo(() => Object.values(clientsMap).filter(c => c.active), [clientsMap]);
    const toGetOptionLabel = useCallback(client => client.name, []);
    const toGetOptionSelected = useCallback(
        client => client._id === getValues(fieldNames.to)._id,
        [getValues, fieldNames.to]);
    const toAddGetOptionSelected = useCallback(
        a => isAddressEqualToDocAddress(a, getValues(fieldNames.toAdd)),
        [getValues, fieldNames.toAdd]);
    const shipAddGetOptionSelected = useCallback(
        a => isAddressEqualToDocAddress(a, getValues(fieldNames.shipAdd)),
        [getValues, fieldNames.shipAdd]);

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
                        inputRef={ register }
                        error={ !!errors[fieldNames.ref] }
                        required={ !autoGenerateRef }
                        disabled={ isEdit || autoGenerateRef }
                    />
                    { !isEdit &&
                    <RHFDateField
                        rhfControl={ control }
                        name={ fieldNames.date }
                        label={ formLabels.date }
                        required
                        error={ !!errors[fieldNames.date] }
                    /> }
                    <RHFAutoComplete
                        rhfControl={ control }
                        name={ fieldNames.fromAdd }
                        label={ formLabels.fromAdd }
                        options={ companyAddresses }
                        getOptionLabel={ formatAddress }
                        getOptionSelected={ fromAddGetOptionSelected }
                        error={ !!errors[fieldNames.fromAdd] }
                        rowsMax={ 8 }
                        required
                    />
                    <RHFAutoComplete
                        rhfControl={ control }
                        name={ fieldNames.to }
                        label={ formLabels.to }
                        options={ clients }
                        getOptionLabel={ toGetOptionLabel }
                        getOptionSelected={ toGetOptionSelected }
                        error={ !!errors[fieldNames.to] }
                        required
                    />
                    <RHFAutoComplete
                        rhfControl={ control }
                        name={ fieldNames.toAdd }
                        label={ formLabels.toAdd }
                        options={ clientAddresses }
                        getOptionLabel={ formatAddress }
                        getOptionSelected={ toAddGetOptionSelected }
                        error={ !!errors[fieldNames.toAdd] }
                        rows={ 7 }
                        required
                    />
                    { shouldShowAddAddressButton && <NewClientAddressButton client={ client }/> }
                    <RHFDateField
                        rhfControl={ control }
                        name={ fieldNames.crd }
                        label={ formLabels.crd }
                    />
                    { isEdit &&
                    <RHFDateField
                        rhfControl={ control }
                        name={ fieldNames.realCrd }
                        label={ formLabels.realCrd }
                    /> }
                    <RHFAutoComplete
                        rhfControl={ control }
                        name={ fieldNames.incoterm }
                        label={ formLabels.incoterm }
                        options={ incotermOptions }
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
                    <RHFAutoComplete
                        rhfControl={ control }
                        name={ fieldNames.shipAdd }
                        label={ formLabels.shipAdd }
                        options={ clientAddresses }
                        getOptionLabel={ formatAddress }
                        getOptionSelected={ shipAddGetOptionSelected }
                        rows={ 7 }
                    />
                    <RHFAutoComplete
                        rhfControl={ control }
                        name={ fieldNames.del }
                        label={ formLabels.del }
                        options={ deliveryMethodOptions }
                    />
                    <RHFAutoComplete
                        rhfControl={ control }
                        name={ fieldNames.pol }
                        label={ formLabels.pol }
                        options={ companyPorts }
                        freeSolo
                        autoSelect
                    />
                    <RHFAutoComplete
                        rhfControl={ control }
                        name={ fieldNames.pod }
                        label={ formLabels.pod }
                        options={ companyPorts }
                        freeSolo
                        autoSelect
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

export default RHFOrderDetails;

// { !isEdit &&
// <Controller
//     render={ props =>
//         <SideDateField
//             { ...props }
//             label={ formLabels.date }
//             error={ !!errors[fieldNames.date] }
//             required
//         />
//     }
//     name={ fieldNames.date }
//     control={ control }
//     rules={ { required: true } }
// /> }