import React, { useCallback, useEffect, useRef } from 'react';
import FormDialog from '../shared/wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import FormContainer from '../shared/wrappers/FormContainer.js';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import PropTypes from 'prop-types';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import OrderStatusListItem from './OrderStatusListItem.js';
import RHFDateField from '../shared/rhf/inputs/RHFDateField.js';
import { useSelector } from 'react-redux';
import { selectOrderStatuses } from 'app/duck/selectors.js';
import {
    getOptionId,
    getOptionLabel,
} from 'app/utils/options/getters.js';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
    },
    formContainer: {
        padding: theme.spacing(1),
    },
    stepHeader: {
        width: '100%',
        textAlign: 'center',
        paddingBottom: theme.spacing(3),
        fontWeight: 'bold',
    },
    input: {
        width: '60%',
    },
}));

const {
    titles,
    labels
} = LANGUAGE.order.order;

const OrderStatusDialog = React.memo(function OrderStatusDialog(
    {
        isOpen,
        onSubmit,
        onCancel,
        submitLabel,
        procurement,
        production,
        qa,
        titleLabel,
    }) {
    const classes = useStyles();
    const orderStatusOptions = useSelector(selectOrderStatuses);

    const { control, handleSubmit, errors, watch, setValue, reset } = useForm({
        mode: 'onSubmit',
    });

    const procurementStatus = watch('procurementStatus');
    const productionStatus = watch('productionStatus');
    const qaStatus = watch('qaStatus');

    useEffect(() => {
        reset({
            procurementStatus: procurement.status,
            productionStatus: production.status,
            qaStatus: qa.status,
            procurementEstimated: procurement.estimated || null,
            productionEstimated: production.estimated || null,
            qaEstimated: qa.estimated || null,
            procurementActual: procurement.actual || null,
            productionActual: production.actual || null,
            qaActual: qa.actual || null,
        });
    }, [reset, procurement, production, qa]);

    const prevProcurementStatus = useRef(getOptionId(procurementStatus));
    const prevProductionStatus = useRef(getOptionId(productionStatus));
    const prevQaStatus = useRef(qaStatus);
    useEffect(() => {
        const currProcurementStatus = getOptionId(procurementStatus);
        if (prevProcurementStatus !== currProcurementStatus) {
            if (currProcurementStatus === 'Completed') setValue('procurementActual', new Date());
            prevProcurementStatus.current = currProcurementStatus;
        }

        const currProductionStatus = getOptionId(productionStatus);
        if (prevProductionStatus !== currProductionStatus) {
            if (currProductionStatus === 'Completed') setValue('productionActual', new Date());
            prevProductionStatus.current = currProductionStatus;
        }

        const currQaStatus = getOptionId(qaStatus);
        if (prevQaStatus !== currQaStatus) {
            if (currQaStatus === 'Completed') setValue('qaActual', new Date());
            prevQaStatus.current = currQaStatus;
        }
    }, [setValue, procurementStatus, productionStatus, qaStatus]);

    const onFormSubmit = useCallback(
        (data) => {
            if (data.procurementEstimated)
                data.procurementEstimated = data.procurementEstimated.toString();
            if (data.procurementActual)
                data.procurementActual = data.procurementActual.toString();
            if (data.productionEstimated)
                data.productionEstimated = data.productionEstimated.toString();
            if (data.productionActual)
                data.productionActual = data.productionActual.toString();
            if (data.qaEstimated)
                data.qaEstimated = data.qaEstimated.toString();
            if (data.qaActual)
                data.qaActual = data.qaActual.toString();
            const update = {
                procurement: {
                    status: getOptionId(data.procurementStatus),
                    estimated: data.procurementEstimated,
                    actual: data.procurementActual
                },
                production: {
                    status: getOptionId(data.productionStatus),
                    estimated: data.productionEstimated,
                    actual: data.productionActual
                },
                qa: {
                    status: getOptionId(data.qaStatus),
                    estimated: data.qaEstimated,
                    actual: data.qaActual
                }
            };
            onSubmit(update);
        },
        [onSubmit]
    );

    const renderOption = useCallback(
        (option) => <OrderStatusListItem option={ option }/>,
        []
    );

    return (
        <FormDialog
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onFormSubmit) }
        >
            <Grid container className={ classes.container }>
                <Grid item xs={ 12 } md={ 6 } lg={ 4 }>
                    <FormContainer className={ classes.formContainer }>
                        <Typography variant="h6" className={ classes.stepHeader }>
                            { titles.procurement }
                        </Typography>
                        <RHFAutoComplete
                            rhfControl={ control }
                            name="procurementStatus"
                            label={ labels.status }
                            options={ orderStatusOptions }
                            getOptionLabel={ (option) =>
                                getOptionLabel(option, LOCALE)
                            }
                            getOptionSelected={ (option, value) =>
                                option.id === value.id
                            }
                            required
                            error={ !!errors.procurementStatus }
                            className={ classes.input }
                            renderOption={ renderOption }
                        />
                        <RHFDateField
                            rhfControl={ control }
                            name="procurementEstimated"
                            label={ labels.estimated }
                            className={ classes.input }
                        />
                        <RHFDateField
                            rhfControl={ control }
                            name="procurementActual"
                            label={ labels.actual }
                            className={ classes.input }
                        />
                    </FormContainer>
                </Grid>
                {/* <Divider orientation="vertical" flexItem /> */ }
                <Grid item xs={ 12 } md={ 6 } lg={ 4 }>
                    <FormContainer className={ classes.formContainer }>
                        <Typography variant="h6" className={ classes.stepHeader }>
                            { titles.production }
                        </Typography>
                        <RHFAutoComplete
                            rhfControl={ control }
                            name="productionStatus"
                            label={ labels.status }
                            options={ orderStatusOptions }
                            getOptionLabel={ (option) =>
                                getOptionLabel(option, LOCALE)
                            }
                            getOptionSelected={ (option, value) =>
                                option.id === value.id
                            }
                            required
                            error={ !!errors.productionStatus }
                            className={ classes.input }
                            renderOption={ renderOption }
                        />
                        <RHFDateField
                            rhfControl={ control }
                            name="productionEstimated"
                            label={ labels.estimated }
                            className={ classes.input }
                        />
                        <RHFDateField
                            rhfControl={ control }
                            name="productionActual"
                            label={ labels.actual }
                            className={ classes.input }
                        />
                    </FormContainer>
                </Grid>
                <Grid item xs={ 12 } md={ 6 } lg={ 4 }>
                    <FormContainer className={ classes.formContainer }>
                        <Typography variant="h6" className={ classes.stepHeader }>
                            { titles.qa }
                        </Typography>
                        <RHFAutoComplete
                            rhfControl={ control }
                            name="qaStatus"
                            label={ labels.status }
                            options={ orderStatusOptions }
                            getOptionLabel={ (option) =>
                                getOptionLabel(option, LOCALE)
                            }
                            getOptionSelected={ (option, value) =>
                                option.id === value.id
                            }
                            required
                            error={ !!errors.qaStatus }
                            className={ classes.input }
                            renderOption={ renderOption }
                        />
                        <RHFDateField
                            rhfControl={ control }
                            name="qaEstimated"
                            label={ labels.estimated }
                            className={ classes.input }
                        />
                        <RHFDateField
                            rhfControl={ control }
                            name="qaActual"
                            label={ labels.actual }
                            className={ classes.input }
                        />
                    </FormContainer>
                </Grid>
            </Grid>
        </FormDialog>
    );
});

OrderStatusDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    titleLabel: PropTypes.string.isRequired,
    procurement: PropTypes.object,
    production: PropTypes.object,
    qa: PropTypes.object,
};

export default OrderStatusDialog;
