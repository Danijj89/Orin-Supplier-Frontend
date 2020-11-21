import React, { useCallback } from 'react';
import { LANGUAGE } from '../../app/constants.js';
import FormContainer from '../shared/wrappers/FormContainer.js';
import { useWatch } from 'react-hook-form';
import SideTextField from '../shared/inputs/SideTextField.js';
import { formatAddress } from '../shared/utils/format.js';
import SideTextArea from '../shared/inputs/SideTextArea.js';
import RHFCheckBox from '../shared/rhf/inputs/RHFCheckBox.js';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { isAddressEqualToDocAddress } from '../shared/utils/addresses.js';

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

    const sellerAddGetOptionSelected = useCallback(
        a => isAddressEqualToDocAddress(a, getValues(fieldNames.sellerAdd)),
        [getValues, fieldNames.sellerAdd]);
    const consigneeAddGetOptionSelected = useCallback(
        a => isAddressEqualToDocAddress(a, getValues(fieldNames.consigneeAdd)),
        [getValues, fieldNames.consigneeAdd]);

    return (
        <Grid container justify="center">
            <Grid item xs={ 12 }>
                <Typography variant="h5">{ titleLabel }</Typography>
            </Grid>
            <Grid item>
                <FormContainer>
                    <RHFCheckBox
                        name={ fieldNames.autoGenerateRef }
                        label={ formLabels.autoGenerateRef }
                        rhfControl={ control }
                    />
                    <SideTextField
                        name={ fieldNames.ref }
                        label={ formLabels.ref }
                        inputRef={ register }
                        error={ !!errors[fieldNames.ref] }
                        required={ !autoGenerateRef }
                        disabled={ autoGenerateRef }
                    />
                    <RHFAutoComplete
                        rhfControl={ control }
                        name={ fieldNames.sellerAdd }
                        label={ formLabels.sellerAdd }
                        options={ companyAddresses }
                        error={ !!errors[fieldNames.sellerAdd] }
                        getOptionLabel={ formatAddress }
                        getOptionSelected={ sellerAddGetOptionSelected }
                        rowsMax={ 8 }
                        required
                    />
                    <SideTextField
                        label={ formLabels.consignee }
                        value={ consignee.name }
                        disabled
                    />
                    <RHFAutoComplete
                        rhfControl={ control }
                        name={ fieldNames.consigneeAdd }
                        label={ formLabels.consigneeAdd }
                        options={ consigneeAddresses }
                        error={ !!errors[fieldNames.consigneeAdd] }
                        getOptionLabel={ formatAddress }
                        getOptionSelected={ consigneeAddGetOptionSelected }
                        rowsMax={ 8 }
                        required
                    />
                    <SideTextField
                        name={ fieldNames.coo }
                        label={ formLabels.coo }
                        inputRef={ register }
                        error={ !!errors[fieldNames.coo] }
                        required
                    />
                </FormContainer>
            </Grid>
            <Grid item>
                <Box component={ Divider } display={ { xs: 'none', lg: 'block' } } orientation="vertical"/>
            </Grid>
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