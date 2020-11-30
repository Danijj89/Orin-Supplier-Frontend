import React from 'react';
import { LANGUAGE } from '../../app/utils/constants.js';
import FormContainer from '../shared/wrappers/FormContainer.js';
import { useForm } from 'react-hook-form';
import SideTextField from '../shared/inputs/SideTextField.js';
import { formatAddress } from '../shared/utils/format.js';
import RHFCheckBox from '../shared/rhf/inputs/RHFCheckBox.js';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { useSelector } from 'react-redux';
import { selectCompanyActiveAddresses, selectCompanyAddress, selectCompanyPorts } from '../home/duck/selectors.js';
import { selectClientActiveAddresses, selectClientAddress, selectClientById } from '../clients/duck/selectors.js';
import Footer from '../shared/components/Footer.js';
import { useHistory } from 'react-router-dom';
import RHFDateField from '../shared/rhf/inputs/RHFDateField.js';
import { incotermOptions } from '../../app/utils/options/options.js';
import { makeStyles } from '@material-ui/core/styles';


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
        shipmentId
    }) {
    const classes = useStyles();
    const history = useHistory();
    const companyAddresses = useSelector(selectCompanyActiveAddresses);
    const consigneeAddresses = useSelector(state => selectClientActiveAddresses(state, commercialInvoice.consignee));
    const companyPorts = useSelector(selectCompanyPorts);

    const consignee = useSelector(state => selectClientById(state, commercialInvoice.consignee));
    const initialSellerAddress = useSelector(
        state => selectCompanyAddress(
            state,
            commercialInvoice.sellerAdd.addressId || commercialInvoice.sellerAdd._id));
    const initialConsigneeAddress = useSelector(state =>
        selectClientAddress(state, {
            clientId: commercialInvoice.consignee,
            addressId: commercialInvoice.consigneeAdd.addressId || commercialInvoice.consigneeAdd._id
        })
    );

    const { register, control, errors, watch, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [fieldNames.autoGenerateRef]: commercialInvoice.autoGenerateRef,
            [fieldNames.ref]: commercialInvoice.ref,
            [fieldNames.sellerAdd]: initialSellerAddress,
            [fieldNames.consigneeAdd]: initialConsigneeAddress,
            [fieldNames.crd]: commercialInvoice.crd,
            [fieldNames.coo]: commercialInvoice.coo,
            [fieldNames.incoterm]: commercialInvoice.incoterm,
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
        setCommercialInvoice(prev => ({ ...prev, ...data }));
        history.push(`/home/documents/ci/new?step=products&shipment=${ shipmentId }`);
    };

    return (
        <form onSubmit={ handleSubmit(onNextClick) } autoComplete="off">
            <Grid container className={ classes.root } justify="center">
                <Grid item xs={ 12 }>
                    <Typography className={ classes.title } variant="h5">{ titleLabel }</Typography>
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
                            getOptionSelected={ (option, value) => option._id === value._id || !value.active }
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