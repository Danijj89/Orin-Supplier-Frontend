import React from 'react';
import { LANGUAGE } from 'app/utils/constants.js';
import FormContainer from '../shared/wrappers/FormContainer.js';
import { useForm } from 'react-hook-form';
import SideTextField from '../shared/inputs/SideTextField.js';
import { formatAddress } from '../shared/utils/format.js';
import RHFCheckBox from '../shared/rhf/inputs/RHFCheckBox.js';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { useSelector } from 'react-redux';
import { selectActiveCompanyAddresses, selectCompanyPorts } from 'features/home/duck/home/selectors.js';
import { selectClientActiveAddresses } from '../clients/duck/selectors.js';
import Footer from '../shared/components/Footer.js';
import { useHistory } from 'react-router-dom';
import RHFDateField from '../shared/rhf/inputs/RHFDateField.js';
import { makeStyles } from '@material-ui/core/styles';
import { selectCountries, selectIncoterms } from 'app/duck/selectors.js';
import { getOptionLabel } from 'app/utils/options/getters.js';
import { selectShipmentSalesContractRefs } from '../shipments/duck/selectors.js';
import Title5 from 'features/shared/display/Title5.js';
import { getDocumentUrl } from 'features/documents/utils/urls.js';


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
    incoterm: 'incoterm',
    clientRefs: 'clientRefs',
    payRefs: 'payRefs',
    scRef: 'scRef',
    pol: 'pol',
    pod: 'pod',
    notes: 'notes'
};

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(1),
        paddingBottom: theme.spacing(6),
    },
    title: {
        padding: theme.spacing(2),
    }
}));

const CommercialInvoiceDetails = React.memo(function CommercialInvoiceDetails(
    {
        commercialInvoice,
        setCommercialInvoice,
        shipmentId,
        documentId,
        isEdit
    }) {
    const classes = useStyles();
    const history = useHistory();
    const incotermOptions = useSelector(selectIncoterms);
    const companyAddresses = useSelector(selectActiveCompanyAddresses);
    const consigneeAddresses = useSelector(
        state => selectClientActiveAddresses(state, { clientId: commercialInvoice.consignee._id }));
    const companyPorts = useSelector(selectCompanyPorts);
    const countryOptions = useSelector(selectCountries);
    const salesContracts = useSelector(
        state => selectShipmentSalesContractRefs(state, { shipmentId }));
    const initialSalesContract = salesContracts.length ? salesContracts[0] : null;

    const { register, control, errors, watch, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [fieldNames.autoGenerateRef]: commercialInvoice.autoGenerateRef,
            [fieldNames.ref]: commercialInvoice.ref,
            [fieldNames.sellerAdd]: commercialInvoice.sellerAdd,
            [fieldNames.consigneeAdd]: commercialInvoice.consigneeAdd,
            [fieldNames.crd]: commercialInvoice.crd,
            [fieldNames.coo]: commercialInvoice.coo,
            [fieldNames.incoterm]: commercialInvoice.incoterm,
            [fieldNames.clientRefs]: commercialInvoice.clientRefs,
            [fieldNames.payRefs]: commercialInvoice.payRefs,
            [fieldNames.scRef]: commercialInvoice.scRef || initialSalesContract,
            [fieldNames.pol]: commercialInvoice.pol,
            [fieldNames.pod]: commercialInvoice.pod,
            [fieldNames.notes]: commercialInvoice.notes,
        }
    });

    const autoGenerateRef = watch(fieldNames.autoGenerateRef);

    const onPrevClick = () =>
        history.push(`/home/shipments/${ shipmentId }`);

    const onNextClick = (data) => {
        setCommercialInvoice(prev => ({ ...prev, ...data }));
        const urlOptions = {
            edit: isEdit,
            step: 'products'
        };
        if (isEdit) urlOptions.document = documentId;
        history.push(getDocumentUrl('CI', shipmentId, urlOptions));
    };

    return (
        <form onSubmit={ handleSubmit(onNextClick) } autoComplete="off">
            <Grid container className={ classes.root } justify="center">
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
                            inputRef={ register }
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
                            getOptionSelected={ (option, value) => option._id === value._id || !value.active }
                            rowsMax={ 8 }
                            required
                        />
                        <SideTextField
                            label={ formLabels.consignee }
                            value={ commercialInvoice.consignee.name }
                            disabled
                        />
                        <RHFAutoComplete
                            rhfControl={ control }
                            name={ fieldNames.consigneeAdd }
                            label={ formLabels.consigneeAdd }
                            options={ consigneeAddresses }
                            error={ !!errors[fieldNames.consigneeAdd] }
                            getOptionLabel={ formatAddress }
                            getOptionSelected={ (option, value) => option._id === value._id || !value.active }
                            rowsMax={ 8 }
                            required
                        />
                        <RHFAutoComplete
                            rhfControl={ control }
                            name={ fieldNames.incoterm }
                            label={ formLabels.incoterm }
                            options={ incotermOptions }
                            error={ !!errors.incoterm }
                            required
                        />
                        <RHFAutoComplete
                            rhfControl={ control }
                            name={ fieldNames.coo }
                            label={ formLabels.coo }
                            options={ countryOptions }
                            getOptionLabel={ option => getOptionLabel(option) }
                            getOptionSelected={ (option, value) => option.id === value.id }
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
                            name={ fieldNames.scRef }
                            label={ formLabels.scRef }
                            options={ salesContracts }
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