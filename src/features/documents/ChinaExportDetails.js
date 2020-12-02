import React from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import Footer from '../shared/components/Footer.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import FormContainer from '../shared/wrappers/FormContainer.js';
import RHFCheckBox from '../shared/rhf/inputs/RHFCheckBox.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import { formatAddress } from '../shared/utils/format.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { useSelector } from 'react-redux';
import { selectActiveCompanyAddresses } from '../home/duck/selectors.js';
import { selectClientActiveAddresses } from '../clients/duck/selectors.js';

const {
    titleLabel,
    formLabels,
    prevButtonLabel,
    nextButtonLabel
} = LANGUAGE.documents.ce.details;

const fieldNames = {
    autoGenerateRef: 'autoGenerateRef',
    ref: 'ref',
    sName: 'sName',
    sTaxCode: 'sTaxCode',
    cName: 'cName',
    exPort: 'exPort',
    del: 'del',
    bol: 'bol',
    mName: 'mName',
    mTaxCode: 'mTaxCode',
    supervision: 'supervision',
    exception: 'exception',
    scRef: 'scRef',
    tradingCountry: 'tradingCountry',
    destCountry: 'destCountry',
    packageTypes: 'packageTypes',
    packageUnits: 'packageUnits',
    containerNum: 'containerNum',
    pol: 'pol',
    pod: 'pod',
    netWeight: 'netWeight',
    grossWeight: 'grossWeight',
    incoterm: 'incoterm',
    notes: 'notes'
};

const ChinaExportDetails = React.memo(function ChinaExportDetails(
    { chinaExport, setChinaExport, shipmentId, consigneeId }) {
    const history = useHistory();
    const companyAddresses = useSelector(selectActiveCompanyAddresses);
    const consigneeAddresses = useSelector(
        state => selectClientActiveAddresses(state, { clientId: consigneeId }));

    const { register, control, errors, watch, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [fieldNames.autoGenerateRef]: chinaExport.autoGenerateRef,
            [fieldNames.ref]: chinaExport.ref,
            [fieldNames.sName]: chinaExport.sName,
            [fieldNames.sTaxCode]: chinaExport.sTaxCode,
            [fieldNames.cName]: chinaExport.cName,
            [fieldNames.exPort]: chinaExport.exPort,
            [fieldNames.del]: chinaExport.del,
            [fieldNames.bol]: chinaExport.bol,
            [fieldNames.mName]: chinaExport.mName,
            [fieldNames.mTaxCode]: chinaExport.mTaxCode,
            [fieldNames.supervision]: chinaExport.supervision,
            [fieldNames.exception]: chinaExport.exception,
            [fieldNames.scRef]: chinaExport.scRef,
            [fieldNames.tradingCountry]: chinaExport.tradingCountry,
            [fieldNames.destCountry]: chinaExport.destCountry,
            [fieldNames.packageTypes]: chinaExport.packageTypes,
            [fieldNames.packageUnits]: chinaExport.packageUnits,
            [fieldNames.containerNum]: chinaExport.containerNum,
            [fieldNames.pol]: chinaExport.pol,
            [fieldNames.pod]: chinaExport.pod,
            [fieldNames.netWeight]: chinaExport.netWeight,
            [fieldNames.grossWeight]: chinaExport.grossWeight,
            [fieldNames.incoterm]: chinaExport.incoterm,
            [fieldNames.notes]: chinaExport.notes
        }
    });

    const autoGenerateRef = watch(fieldNames.autoGenerateRef);

    const onPrevClick = () =>
        history.push(`/home/shipments/${ shipmentId }`);

    const onNextClick = (data) => {
        setChinaExport(prev => ({ ...prev, ...data }));
        history.push(`/home/documents/ce/new?step=products&shipment=${ shipmentId }`);
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
                            inputRef={ register({ required: !autoGenerateRef }) }
                            error={ !!errors[fieldNames.ref] }
                            required={ !autoGenerateRef }
                            disabled={ autoGenerateRef }
                        />
                        <RHFAutoComplete
                            rhfControl={ control }
                            name={ fieldNames.sName }
                            label={ formLabels.sName }
                            options={ companyAddresses }
                            error={ !!errors[fieldNames.sName] }
                            getOptionLabel={ option => option.name }
                            getOptionSelected={ (option, value) => option._id === value._id }
                            required
                        />
                        <SideTextField
                            name={ fieldNames.sTaxCode }
                            label={ formLabels.sTaxCode }
                            inputRef={ register({ required: true }) }
                            error={ !!errors[fieldNames.sTaxCode] }
                            required
                        />
                        <RHFAutoComplete
                            rhfControl={ control }
                            name={ fieldNames.cName }
                            label={ formLabels.cName }
                            options={ consigneeAddresses }
                            error={ !!errors[fieldNames.cName] }
                            getOptionLabel={ option => option.name }
                            getOptionSelected={ (option, value) => option._id === value._id }
                            required
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

export default ChinaExportDetails;