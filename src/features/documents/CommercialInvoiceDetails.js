import React from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import FormContainer from '../shared/wrappers/FormContainer.js';
import { Controller, useWatch } from 'react-hook-form';
import SideTextField from '../shared/inputs/SideTextField.js';
import SideAutoComplete from '../shared/inputs/SideAutoComplete.js';
import { formatAddress } from '../shared/utils/format.js';
import SideTextArea from '../shared/inputs/SideTextArea.js';
import CheckBox from '../shared/inputs/CheckBox.js';

const {
    titleLabel,
    formLabels
} = LANGUAGE.documents.ci.details;

const CommercialInvoiceDetails = React.memo(function CommercialInvoiceDetails(
    {
        rhfRegister: register,
        rhfControl: control,
        rhfErrors: errors,
        rhfGetValues: getValues,
        fieldNames,
        companyAddresses,
        consigneeAddresses,
        consignee
    }) {

    const autoGenerateRef = useWatch({
        control,
        name: fieldNames.autoGenerateRef
    });



    return (
        <Grid container>
            <Grid item xs={ 12 }>
                <Typography variant="h5">{ titleLabel }</Typography>
            </Grid>
            <Grid item>
                <FormContainer>
                    <CheckBox
                        name={fieldNames.autoGenerateRef}
                        label={formLabels.autoGenerateRef}
                        inputRef={register}
                    />
                    <SideTextField
                        name={ fieldNames.ref }
                        label={ formLabels.ref }
                        inputRef={ register({ required: !autoGenerateRef }) }
                        error={ !!errors[fieldNames.ref] }
                        required={ !autoGenerateRef }
                        disabled={ autoGenerateRef }
                    />
                    <Controller
                        render={ (props) =>
                            <SideAutoComplete
                                { ...props }
                                options={ companyAddresses.filter(a => a.active) }
                                label={ formLabels.sellerAdd }
                                error={ !!errors[fieldNames.sellerAdd] }
                                getOptionLabel={ address => formatAddress(address) }
                                getOptionSelected={ address => address._id === getValues(fieldNames.sellerAdd)._id
                                    || address._id === getValues(fieldNames.sellerAdd).addressId }
                                required
                                rows={ 7 }
                            />
                        }
                        name={ fieldNames.sellerAdd }
                        control={ control }
                        rules={ { required: true } }
                    />
                    <SideTextField
                        label={ formLabels.consignee }
                        value={ consignee.name }
                        disabled
                    />
                    <Controller
                        render={ (props) => (
                            <SideAutoComplete
                                { ...props }
                                options={ consigneeAddresses }
                                label={ formLabels.consigneeAdd }
                                error={ !!errors[fieldNames.consigneeAdd] }
                                getOptionLabel={ address => formatAddress(address) }
                                getOptionSelected={ address => address._id === getValues(fieldNames.consigneeAdd)._id
                                    || address._id === getValues(fieldNames.consigneeAdd).addressId }
                                required
                                rows={ 7 }
                            />
                        ) }
                        name={ fieldNames.consigneeAdd }
                        control={ control }
                        rules={ { required: true } }
                    />
                    <SideTextField
                        name={ fieldNames.coo }
                        label={ formLabels.coo }
                        inputRef={ register({ required: true }) }
                        error={ !!errors[fieldNames.coo] }
                        required
                    />
                </FormContainer>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item>
                <FormContainer>
                    <SideTextField
                        name={ fieldNames.clientRefs }
                        label={ formLabels.clientRefs }
                        inputRef={ register }
                    />
                    <SideTextField
                        name={ fieldNames.payRefs }
                        label={ formLabels.payRefs }
                        inputRef={ register }
                    />
                    <SideTextArea
                        label={ formLabels.notes }
                        name={ fieldNames.notes }
                        inputRef={ register }
                        rows={ 4 }
                        rowsMax={ 8 }
                    />
                </FormContainer>
            </Grid>
        </Grid>
    )
});

export default CommercialInvoiceDetails;