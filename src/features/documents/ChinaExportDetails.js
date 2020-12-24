import React from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import Footer from '../shared/components/Footer.js';
import { LANGUAGE, LOCALE } from '../../app/utils/constants.js';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import FormContainer from '../shared/wrappers/FormContainer.js';
import RHFCheckBox from '../shared/rhf/inputs/RHFCheckBox.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { useSelector } from 'react-redux';
import {
    selectActiveCompanyAddresses,
    selectCompanyPorts,
} from 'features/home/duck/home/selectors.js';
import { selectClientActiveAddresses } from '../clients/duck/selectors.js';
import {
    selectCountries,
    selectExemptionTypes,
    selectIncoterms,
    selectSupervisionMethods,
} from '../../app/duck/selectors.js';
import { getOptionLabel } from '../../app/utils/options/getters.js';
import { makeStyles } from '@material-ui/core/styles';

const {
    titleLabel,
    formLabels,
    prevButtonLabel,
    nextButtonLabel,
} = LANGUAGE.documents.ce.details;

const fieldNames = {
    autoGenerateRef: 'autoGenerateRef',
    ref: 'ref',
    sName: 'sName',
    sTaxCode: 'sTaxCode',
    cName: 'cName',
    mName: 'mName',
    mTaxCode: 'mTaxCode',
    supervision: 'supervision',
    exemption: 'exemption',
    tradingCountry: 'tradingCountry',
    destCountry: 'destCountry',
    packageTypes: 'packageTypes',
    packageUnits: 'packageUnits',
    pol: 'pol',
    pod: 'pod',
    netWeight: 'netWeight',
    grossWeight: 'grossWeight',
    incoterm: 'incoterm',
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

const ChinaExportDetails = React.memo(function ChinaExportDetails({
    chinaExport,
    setChinaExport,
    shipmentId,
    consigneeId,
}) {
    const history = useHistory();
    const classes = useStyles();
    const companyAddresses = useSelector(selectActiveCompanyAddresses);
    const consigneeAddresses = useSelector((state) =>
        selectClientActiveAddresses(state, { clientId: consigneeId })
    );
    const supervisionMethodOptions = useSelector(selectSupervisionMethods);
    const exemptionTypeOptions = useSelector(selectExemptionTypes);
    const countryOptions = useSelector(selectCountries);
    const companyPorts = useSelector(selectCompanyPorts);
    const incotermOptions = useSelector(selectIncoterms);

    const { register, control, errors, watch, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [fieldNames.autoGenerateRef]: chinaExport.autoGenerateRef,
            [fieldNames.ref]: chinaExport.ref,
            [fieldNames.sName]: chinaExport.sName,
            [fieldNames.sTaxCode]: chinaExport.sTaxCode,
            [fieldNames.cName]: chinaExport.cName,
            [fieldNames.mName]: chinaExport.mName,
            [fieldNames.mTaxCode]: chinaExport.mTaxCode,
            [fieldNames.supervision]: chinaExport.supervision,
            [fieldNames.exemption]: chinaExport.exemption,
            [fieldNames.tradingCountry]: chinaExport.tradingCountry,
            [fieldNames.destCountry]: chinaExport.destCountry,
            [fieldNames.packageTypes]: chinaExport.packageTypes,
            [fieldNames.packageUnits]: chinaExport.packageUnits,
            [fieldNames.pol]: chinaExport.pol,
            [fieldNames.pod]: chinaExport.pod,
            [fieldNames.netWeight]: chinaExport.netWeight,
            [fieldNames.grossWeight]: chinaExport.grossWeight,
            [fieldNames.incoterm]: chinaExport.incoterm,
        },
    });

    const autoGenerateRef = watch(fieldNames.autoGenerateRef);

    const onPrevClick = () => history.push(`/home/shipments/${shipmentId}`);

    const onNextClick = (data) => {
        setChinaExport((prev) => ({ ...prev, ...data }));
        history.push(
            `/home/documents/ce/new?step=optional&shipment=${shipmentId}`
        );
    };

    return (
        <form
            onSubmit={handleSubmit(onNextClick)}
            autoComplete="off"
            noValidate
        >
            <Grid container className={classes.root} justify="center">
                <Grid item xs={12}>
                    <Typography className={classes.title} variant="h5">
                        {titleLabel}
                    </Typography>
                </Grid>
                <Grid item>
                    <FormContainer>
                        <RHFCheckBox
                            name={fieldNames.autoGenerateRef}
                            label={formLabels.autoGenerateRef}
                            rhfControl={control}
                        />
                        <SideTextField
                            name={fieldNames.ref}
                            label={formLabels.ref}
                            inputRef={register({ required: !autoGenerateRef })}
                            error={!!errors[fieldNames.ref]}
                            required={!autoGenerateRef}
                            disabled={autoGenerateRef}
                        />
                        <RHFAutoComplete
                            rhfControl={control}
                            name={fieldNames.sName}
                            label={formLabels.sName}
                            options={companyAddresses}
                            error={!!errors[fieldNames.sName]}
                            getOptionLabel={(option) => option.name}
                            getOptionSelected={(option, value) =>
                                option._id === value._id
                            }
                            required
                        />
                        <SideTextField
                            name={fieldNames.sTaxCode}
                            label={formLabels.sTaxCode}
                            inputRef={register({ required: true })}
                            error={!!errors[fieldNames.sTaxCode]}
                            required
                        />
                        <RHFAutoComplete
                            rhfControl={control}
                            name={fieldNames.mName}
                            label={formLabels.mName}
                            options={companyAddresses}
                            error={!!errors[fieldNames.mName]}
                            getOptionLabel={(option) => option.name}
                            getOptionSelected={(option, value) =>
                                option._id === value._id
                            }
                            required
                        />
                        <SideTextField
                            name={fieldNames.mTaxCode}
                            label={formLabels.mTaxCode}
                            inputRef={register({ required: true })}
                            error={!!errors[fieldNames.mTaxCode]}
                            required
                        />
                        <RHFAutoComplete
                            rhfControl={control}
                            name={fieldNames.cName}
                            label={formLabels.cName}
                            options={consigneeAddresses}
                            error={!!errors[fieldNames.cName]}
                            getOptionLabel={(option) => option.name}
                            getOptionSelected={(option, value) =>
                                option._id === value._id
                            }
                            required
                        />
                        <RHFAutoComplete
                            rhfControl={control}
                            name={fieldNames.supervision}
                            label={formLabels.supervision}
                            options={supervisionMethodOptions}
                            error={!!errors[fieldNames.supervision]}
                            required
                        />
                        <RHFAutoComplete
                            rhfControl={control}
                            name={fieldNames.exemption}
                            label={formLabels.exemption}
                            options={exemptionTypeOptions}
                            error={!!errors[fieldNames.exemption]}
                            required
                        />
                    </FormContainer>
                </Grid>
                <Grid item>
                    <FormContainer>
                        <RHFAutoComplete
                            rhfControl={control}
                            name={fieldNames.tradingCountry}
                            label={formLabels.tradingCountry}
                            options={countryOptions}
                            getOptionLabel={(option) =>
                                getOptionLabel(option, LOCALE)
                            }
                            getOptionSelected={(option, value) =>
                                option.id === value.id
                            }
                            error={!!errors[fieldNames.tradingCountry]}
                            required
                        />
                        <RHFAutoComplete
                            rhfControl={control}
                            name={fieldNames.destCountry}
                            label={formLabels.destCountry}
                            options={countryOptions}
                            getOptionLabel={(option) =>
                                getOptionLabel(option, LOCALE)
                            }
                            getOptionSelected={(option, value) =>
                                option.id === value.id
                            }
                            error={!!errors[fieldNames.destCountry]}
                            required
                        />
                        <RHFAutoComplete
                            rhfControl={control}
                            name={fieldNames.pol}
                            label={formLabels.pol}
                            options={companyPorts}
                            error={!!errors[fieldNames.pol]}
                            required
                            freeSolo
                            autoSelect
                        />
                        <RHFAutoComplete
                            rhfControl={control}
                            name={fieldNames.pod}
                            label={formLabels.pod}
                            options={companyPorts}
                            error={!!errors[fieldNames.pod]}
                            required
                            freeSolo
                            autoSelect
                        />
                        <SideTextField
                            name={fieldNames.packageTypes}
                            label={formLabels.packageTypes}
                            inputRef={register({ required: true })}
                            error={!!errors[fieldNames.packageTypes]}
                            required
                        />
                        <SideTextField
                            name={fieldNames.packageUnits}
                            label={formLabels.packageUnits}
                            type="number"
                            inputRef={register({ required: true })}
                            error={!!errors[fieldNames.packageUnits]}
                            required
                        />
                        <SideTextField
                            name={fieldNames.grossWeight}
                            label={formLabels.grossWeight}
                            type="number"
                            inputRef={register({ required: true })}
                            error={!!errors[fieldNames.grossWeight]}
                            required
                        />
                        <SideTextField
                            name={fieldNames.netWeight}
                            label={formLabels.netWeight}
                            type="number"
                            inputRef={register({ required: true })}
                            error={!!errors[fieldNames.netWeight]}
                            required
                        />
                        <RHFAutoComplete
                            rhfControl={control}
                            name={fieldNames.incoterm}
                            label={formLabels.incoterm}
                            options={incotermOptions}
                            error={!!errors[fieldNames.incoterm]}
                            required
                        />
                    </FormContainer>
                </Grid>
            </Grid>
            <Footer
                prevLabel={prevButtonLabel}
                nextLabel={nextButtonLabel}
                onPrevClick={onPrevClick}
                nextButtonType="submit"
            />
        </form>
    );
});

export default ChinaExportDetails;
