import React from 'react';
import { LANGUAGE } from '../../app/constants.js';
import FormContainer from '../shared/wrappers/FormContainer.js';
import { useForm } from 'react-hook-form';
import SideTextField from '../shared/inputs/SideTextField.js';
import { formatAddress } from '../shared/utils/format.js';
import SideTextArea from '../shared/inputs/SideTextArea.js';
import RHFCheckBox from '../shared/rhf/inputs/RHFCheckBox.js';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { findAddressFromAddresses } from '../shared/utils/addresses.js';
import { useSelector } from 'react-redux';
import { selectCompanyActiveAddresses, selectCompanyPorts } from '../home/duck/selectors.js';
import { selectClientActiveAddresses, selectClientById } from '../clients/duck/selectors.js';
import Footer from '../shared/components/Footer.js';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import RHFDateField from '../shared/rhf/inputs/RHFDateField.js';

const {
    titleLabel,
    formLabels,
    prevButtonLabel,
    nextButtonLabel
} = LANGUAGE.documents.ci.details;

const fieldNames = {
    autoGenerateRef: 'autoGenerateRef',
    ref: 'ref',
    sellerAdd: 'sellerAdd',
    consigneeAdd: 'consigneeAdd',
    crd: 'crd',
    coo: 'coo',
    clientRefs: 'clientRefs',
    payRefs: 'payRefs',
    pol: 'pol',
    pod: 'pod',
    notes: 'notes'
};

const CommercialInvoiceDetails = React.memo(function CommercialInvoiceDetails(
    {
        commercialInvoice,
        setCommercialInvoice,
        setStep
    }) {
    const location = useLocation();
    const { shipment: shipmentId } = queryString.parse(location.search);
    const history = useHistory();
    const companyAddresses = useSelector(selectCompanyActiveAddresses);
    const consignee = useSelector(state => selectClientById(state, commercialInvoice.consignee));
    const consigneeAddresses = useSelector(state => selectClientActiveAddresses(state, commercialInvoice.consignee));
    const companyPorts = useSelector(selectCompanyPorts);

    const { register, control, errors, watch, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [fieldNames.autoGenerateRef]: commercialInvoice.autoGenerateRef,
            [fieldNames.ref]: commercialInvoice.ref,
            [fieldNames.sellerAdd]: findAddressFromAddresses(commercialInvoice.sellerAdd, companyAddresses),
            [fieldNames.consigneeAdd]: findAddressFromAddresses(commercialInvoice.consigneeAdd, consigneeAddresses),
            [fieldNames.crd]: commercialInvoice.crd,
            [fieldNames.coo]: commercialInvoice.coo,
            [fieldNames.clientRefs]: commercialInvoice.clientRefs,
            [fieldNames.payRefs]: commercialInvoice.payRefs,
            [fieldNames.pol]: commercialInvoice.pol,
            [fieldNames.pod]: commercialInvoice.pod,
            [fieldNames.notes]: commercialInvoice.notes,
        }
    });

    const autoGenerateRef = watch(fieldNames.autoGenerateRef);

    const onPrevClick = () =>
        history.push(`/home/shipments/${ shipmentId }`);

    const onNextClick = (data) => {
        setCommercialInvoice(prev => ({...prev, ...data}));
        setStep('products');
    };

    return (
        <form onSubmit={ handleSubmit(onNextClick) } autoComplete="off">
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
                            getOptionSelected={ (option, value) => option._id === value._id }
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
                            getOptionSelected={ (option, value) => option._id === value._id }
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
                        <RHFDateField
                            rhfControl={ control }
                            name={ fieldNames.crd }
                            label={ formLabels.crd }
                        />
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
            <Footer
                prevLabel={ prevButtonLabel }
                nextLabel={ nextButtonLabel }
                onPrevClick={ onPrevClick }
                nextButtonType="submit"
            />
        </form>
    )
});

export default CommercialInvoiceDetails;