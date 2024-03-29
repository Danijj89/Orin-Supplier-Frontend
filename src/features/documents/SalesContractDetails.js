import React from 'react';
import { LANGUAGE } from 'app/utils/constants.js';
import FormContainer from '../shared/wrappers/FormContainer.js';
import RHFCheckBox from '../shared/rhf/inputs/RHFCheckBox.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { formatAddress } from '../shared/utils/format.js';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
    selectActiveCompanyBankDetails,
    selectActiveCompanyAddresses,
    selectCompanyPorts,
} from 'features/home/duck/home/selectors.js';
import { selectClientActiveAddresses } from '../clients/duck/selectors.js';
import RHFDateField from '../shared/rhf/inputs/RHFDateField.js';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Footer from '../shared/components/Footer.js';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Title5 from 'features/shared/display/Title5.js';
import { getDocumentUrl } from 'features/documents/utils/urls.js';

const {
    titleLabel,
    formLabels,
    prevButtonLabel,
    nextButtonLabel,
} = LANGUAGE.documents.sc.details;

const fieldNames = {
    autoGenerateRef: 'autoGenerateRef',
    ref: 'ref',
    sellerAdd: 'sellerAdd',
    consigneeAdd: 'consigneeAdd',
    date: 'date',
    bankDetails: 'bankDetails',
    termsOfPayment: 'termsOfPayment',
    timeOfShipment: 'timeOfShipment',
    insurance: 'insurance',
    customText: 'customText',
    pol: 'pol',
    pod: 'pod',
    notes: 'notes',
};

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(1),
        paddingBottom: theme.spacing(6),
    },
    title: {
        padding: theme.spacing(2),
    },
}));

const SalesContractDetails = React.memo(function SalesContractDetails(
    {
        salesContract,
        setSalesContract,
        shipmentId,
        documentId,
        isEdit
    }) {
    const history = useHistory();
    const companyAddresses = useSelector(selectActiveCompanyAddresses);
    const consigneeAddresses = useSelector((state) =>
        selectClientActiveAddresses(state, {
            clientId: salesContract.consignee._id,
        })
    );
    const companyBankDetails = useSelector(selectActiveCompanyBankDetails);
    const companyPorts = useSelector(selectCompanyPorts);
    const classes = useStyles();
    const { register, control, errors, watch, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [fieldNames.autoGenerateRef]: salesContract.autoGenerateRef,
            [fieldNames.ref]: salesContract.ref,
            [fieldNames.sellerAdd]: salesContract.sellerAdd,
            [fieldNames.consigneeAdd]: salesContract.consigneeAdd,
            [fieldNames.date]: salesContract.date,
            [fieldNames.bankDetails]: salesContract.bankDetails,
            [fieldNames.termsOfPayment]: salesContract.termsOfPayment,
            [fieldNames.timeOfShipment]: salesContract.timeOfShipment,
            [fieldNames.insurance]: salesContract.insurance,
            [fieldNames.customText]: salesContract.customText,
            [fieldNames.pol]: salesContract.pol,
            [fieldNames.pod]: salesContract.pod,
            [fieldNames.notes]: salesContract.notes,
        },
    });

    const autoGenerateRef = watch(fieldNames.autoGenerateRef);

    const onPrevClick = () => history.push(`/home/shipments/${ shipmentId }`);

    const onNextClick = (data) => {
        setSalesContract((prev) => ({ ...prev, ...data }));
        const urlOptions = {
            edit: isEdit,
            step: 'products'
        };
        if (isEdit) urlOptions.document = documentId;
        history.push(getDocumentUrl('SC', shipmentId, urlOptions));
    };

    return (
        <form
            onSubmit={ handleSubmit(onNextClick) }
            autoComplete="off"
            className={ classes.root }
        >
            <Grid container justify="center">
                <Grid item xs={ 12 }>
                    <Title5 className={ classes.title } title={ titleLabel }/>
                </Grid>
                <Grid item>
                    <FormContainer>
                        <RHFCheckBox
                            name={ fieldNames.autoGenerateRef }
                            label={ formLabels.autoGenerateRef }
                            rhfControl={ control }
                            disabled={ isEdit }
                        />
                        <SideTextField
                            name={ fieldNames.ref }
                            label={ formLabels.ref }
                            inputRef={ register({ required: !autoGenerateRef }) }
                            error={ !!errors[fieldNames.ref] }
                            required={ !autoGenerateRef }
                            disabled={ autoGenerateRef || isEdit }
                        />
                        <RHFAutoComplete
                            rhfControl={ control }
                            name={ fieldNames.sellerAdd }
                            label={ formLabels.sellerAdd }
                            options={ companyAddresses }
                            error={ !!errors[fieldNames.sellerAdd] }
                            getOptionLabel={ formatAddress }
                            getOptionSelected={ (option, value) =>
                                option._id === value._id || !value.active
                            }
                            rowsMax={ 8 }
                            required
                        />
                        <SideTextField
                            label={ formLabels.consignee }
                            value={ salesContract.consignee.name }
                            disabled
                        />
                        <RHFAutoComplete
                            rhfControl={ control }
                            name={ fieldNames.consigneeAdd }
                            label={ formLabels.consigneeAdd }
                            options={ consigneeAddresses }
                            error={ !!errors[fieldNames.consigneeAdd] }
                            getOptionLabel={ formatAddress }
                            getOptionSelected={ (option, value) =>
                                option._id === value._id || !value.active
                            }
                            rowsMax={ 8 }
                            required
                        />
                        <RHFDateField
                            rhfControl={ control }
                            name={ fieldNames.date }
                            label={ formLabels.date }
                            error={ !!errors[fieldNames.date] }
                            required
                        />
                    </FormContainer>
                </Grid>
                <Grid item>
                    <Box
                        component={ Divider }
                        display={ { xs: 'none', lg: 'block' } }
                        orientation="vertical"
                    />
                </Grid>
                <Grid item>
                    <FormContainer>
                        <RHFAutoComplete
                            rhfControl={ control }
                            name={ fieldNames.bankDetails }
                            label={ formLabels.bankDetails }
                            options={ companyBankDetails }
                            getOptionLabel={ (option) => option.detail }
                            getOptionSelected={ (option, value) =>
                                option._id === value._id || !value.active
                            }
                            rows={ 4 }
                            rowsMax={ 8 }
                        />
                        <SideTextField
                            name={ fieldNames.termsOfPayment }
                            label={ formLabels.termsOfPayment }
                            inputRef={ register }
                            rowsMax={ 8 }
                        />
                        <SideTextField
                            name={ fieldNames.timeOfShipment }
                            label={ formLabels.timeOfShipment }
                            inputRef={ register }
                            rowsMax={ 8 }
                        />
                        <SideTextField
                            name={ fieldNames.insurance }
                            label={ formLabels.insurance }
                            inputRef={ register }
                            rowsMax={ 8 }
                        />
                        <SideTextField
                            name={ fieldNames.customText }
                            label={ formLabels.customText }
                            inputRef={ register }
                            rowsMax={ 8 }
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
                            label={ formLabels.notes }
                            name={ fieldNames.notes }
                            inputRef={ register }
                            rowsMax={ 8 }
                        />
                    </FormContainer>
                </Grid>
            </Grid>
            <Footer
                prevLabel={ prevButtonLabel }
                nextLabel={ nextButtonLabel }
                onPrevClick={ onPrevClick }
                nextButtonType="submit"
            />
        </form>
    );
});

export default SalesContractDetails;
