import React from 'react';
import FormContainer from '../shared/wrappers/FormContainer.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { getOptionLabel } from 'app/utils/options/getters.js';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectCompanyPorts } from 'features/home/duck/home/selectors.js';
import { selectDeliveryMethods } from 'app/duck/selectors.js';
import { selectShipmentSalesContractRefs } from '../shipments/duck/selectors.js';
import Footer from '../shared/components/Footer.js';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Title5 from 'features/shared/display/Title5.js';

const {
    titleLabel,
    formLabels,
    prevButtonLabel,
    nextButtonLabel
} = LANGUAGE.documents.ce.optional;

const fieldNames = {
    exPort: 'exPort',
    del: 'del',
    bol: 'bol',
    scRef: 'scRef',
    containerNum: 'containerNum'
};

const ChinaExportDetailsOptional = React.memo(function ChinaExportDetailsOptional(
    { chinaExport, setChinaExport, shipmentId }) {
    const history = useHistory();
    const companyPorts = useSelector(selectCompanyPorts);
    const deliveryMethods = useSelector(selectDeliveryMethods);
    const salesContracts = useSelector(
        state => selectShipmentSalesContractRefs(state, { shipmentId }));

    const { register, control, getValues, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [fieldNames.exPort]: chinaExport.exPort,
            [fieldNames.del]: chinaExport.del || null,
            [fieldNames.bol]: chinaExport.bol,
            [fieldNames.scRef]: chinaExport.scRef || null,
            [fieldNames.containerNum]: chinaExport.containerNum,
        }
    });

    const onPrevClick = () => {
        setChinaExport(prev => ({ ...prev, ...getValues() }));
        history.push(`/home/documents/ce/new?step=details&shipment=${ shipmentId }`);
    };


    const onNextClick = (data) => {
        setChinaExport(prev => ({ ...prev, ...data }));
        history.push(`/home/documents/ce/new?step=products&shipment=${ shipmentId }`);
    };

    return (
        <form onSubmit={ handleSubmit(onNextClick) } autoComplete="off">
            <Title5 title={ titleLabel }/>
            <Grid container justify="center">
                <FormContainer>
                    <RHFAutoComplete
                        rhfControl={ control }
                        name={ fieldNames.exPort }
                        label={ formLabels.exPort }
                        options={ companyPorts }
                        freeSolo
                        autoSelect
                    />
                    <RHFAutoComplete
                        rhfControl={ control }
                        name={ fieldNames.del }
                        label={ formLabels.del }
                        options={ deliveryMethods }
                        getOptionLabel={ option => getOptionLabel(option, LOCALE) }
                        getOptionSelected={ (option, value) => option.id === value.id }
                    />
                    <SideTextField
                        name={ fieldNames.bol }
                        label={ formLabels.bol }
                        inputRef={ register }
                    />
                    <RHFAutoComplete
                        rhfControl={ control }
                        name={ fieldNames.scRef }
                        label={ formLabels.scRef }
                        options={ salesContracts }
                    />
                    <SideTextField
                        name={ fieldNames.containerNum }
                        label={ formLabels.containerNum }
                        inputRef={ register }
                    />
                </FormContainer>
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

export default ChinaExportDetailsOptional;