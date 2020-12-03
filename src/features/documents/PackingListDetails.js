import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormContainer from '../shared/wrappers/FormContainer.js';
import RHFCheckBox from '../shared/rhf/inputs/RHFCheckBox.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import Grid from '@material-ui/core/Grid';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { formatAddress } from '../shared/utils/format.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectActiveCompanyAddresses, selectCompanyPorts } from '../home/duck/selectors.js';
import { selectClientActiveAddresses } from '../clients/duck/selectors.js';
import { selectShipmentCommercialInvoices, selectShipmentSalesContractRefs } from '../shipments/duck/selectors.js';
import { useHistory } from 'react-router-dom';
import Footer from '../shared/components/Footer.js';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

const {
    titleLabel,
    formLabels,
    prevButtonLabel,
    nextButtonLabel
} = LANGUAGE.documents.pl.details;

const fieldNames = {
    autoGenerateRef: 'autoGenerateRef',
    ref: 'ref',
    sellerAdd: 'sellerAdd',
    consigneeAdd: 'consigneeAdd',
    shipAdd: 'shipAdd',
    ciRef: 'ciRef',
    scRef: 'scRef',
    pol: 'pol',
    pod: 'pod',
    notes: 'notes'
};

const useStyles = makeStyles((theme) => ({
    title: {
        padding: theme.spacing(2),
    }
}));

const PackingListDetails = React.memo(function PackingListDetails(
    { packingList, setPackingList, shipmentId }) {
    const classes = useStyles();
    const history = useHistory();
    const companyAddresses = useSelector(selectActiveCompanyAddresses);
    const consigneeAddresses = useSelector(
        state => selectClientActiveAddresses(state, { clientId: packingList.consignee._id }));
    const commercialInvoices = useSelector(
        state => selectShipmentCommercialInvoices(state, { shipmentId }));
    const salesContracts = useSelector(
        state => selectShipmentSalesContractRefs(state, { shipmentId }));
    const initialSalesContract = salesContracts.length ? salesContracts[0] : null;
    const companyPorts = useSelector(selectCompanyPorts);

    const { register, control, errors, watch, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [fieldNames.autoGenerateRef]: packingList.autoGenerateRef,
            [fieldNames.ref]: packingList.ref,
            [fieldNames.sellerAdd]: packingList.sellerAdd,
            [fieldNames.consigneeAdd]: packingList.consigneeAdd,
            [fieldNames.shipAdd]: packingList.shipAdd || null,
            [fieldNames.ciRef]: commercialInvoices.length ? commercialInvoices[0] : null,
            [fieldNames.scRef]: packingList.scRef || initialSalesContract,
            [fieldNames.pol]: packingList.pol || null,
            [fieldNames.pod]: packingList.pod || null,
            [fieldNames.notes]: packingList.notes
        }
    });

    const autoGenerateRef = watch(fieldNames.autoGenerateRef);

    const onPrevClick = () =>
        history.push(`/home/shipments/${ shipmentId }`);

    const onNextClick = (data) => {
        setPackingList(prev => ({ ...prev, ...data }));
        history.push(`/home/documents/pl/new?step=products&shipment=${ shipmentId }`);
    };

    return (
        <form onSubmit={ handleSubmit(onNextClick) } autoComplete="off">
            <Grid container justify="center">
                <Grid item xs={12}>
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
                            value={ packingList.consignee.name }
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
                    </FormContainer>
                </Grid>
                <Grid item>
                    <Box component={ Divider } display={ { xs: 'none', lg: 'block' } } orientation="vertical"/>
                </Grid>
                <Grid item>
                    <FormContainer>
                        <RHFAutoComplete
                            rhfControl={ control }
                            name={ fieldNames.shipAdd }
                            label={ formLabels.shipAdd }
                            options={ consigneeAddresses }
                            getOptionLabel={ formatAddress }
                            getOptionSelected={ (option, value) => option._id === value._id || !value.active }
                            rowsMax={ 8 }
                        />
                        <RHFAutoComplete
                            rhfControl={ control }
                            name={ fieldNames.ciRef }
                            label={ formLabels.ciRef }
                            options={ commercialInvoices }
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

export default PackingListDetails;