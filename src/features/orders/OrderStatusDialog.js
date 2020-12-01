import React, { useCallback, useEffect } from 'react';
import FormDialog from '../shared/wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography } from '@material-ui/core';
import FormContainer from '../shared/wrappers/FormContainer.js';
import { LANGUAGE, LOCALE } from '../../app/utils/constants.js';
import PropTypes from 'prop-types';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import OrderStatusListItem from './OrderStatusListItem.js';
import RHFDateField from '../shared/rhf/inputs/RHFDateField.js';
import { useSelector } from 'react-redux';
import { selectOrderStatuses } from '../../app/duck/selectors.js';
import { getOptionId, getOptionLabel } from '../../app/utils/options/getters.js';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex'
    },
    formContainer: {
        padding: theme.spacing(1)
    },
    stepHeader: {
        width: '100%',
        textAlign: 'center',
        paddingBottom: theme.spacing(3),
        fontWeight: 'bold',
    },
    input: {
        width: 200
    }
}));

const {
    procurementTitleLabel,
    productionTitleLabel,
    qaTitleLabel,
    statusLabel,
    estimatedLabel,
    actualLabel
} = LANGUAGE.order.order.orderDetails.statusInfoCard.orderStatusDialog;

const OrderStatusDialog = React.memo(function OrderStatusDialog(
    {
        isOpen,
        onSubmit,
        onCancel,
        submitLabel,
        status,
        titleLabel
    }) {
    const classes = useStyles();
    const orderStatusOptions = useSelector(selectOrderStatuses);

    const { procurement, production, qa } = status;
    const { control, handleSubmit, errors, watch, setValue, reset } = useForm({
        mode: 'onSubmit'
    });

    const procurementStatus = watch('procurementStatus');
    const productionStatus = watch('productionStatus');
    const qaStatus = watch('qaStatus');

    useEffect(() => {
        reset({
            procurementStatus: procurement.status,
            productionStatus: production.status,
            qaStatus: qa.status,
            procurementEstimated: procurement.estimated,
            productionEstimated: production.estimated,
            qaEstimated: qa.estimated,
            procurementActual: procurement.actual,
            productionActual: production.actual,
            qaActual: qa.actual
        });
    }, [reset, procurement, production, qa]);

    useEffect(() => {
        if (procurementStatus === 'Completed') setValue('procurementActual', new Date());
        else if (productionStatus === 'Completed') setValue('productionActual', new Date());
        else if (qaStatus === 'Completed') setValue('qaActual', new Date());
    }, [setValue, procurementStatus, productionStatus, qaStatus]);

    const onFormSubmit = useCallback(data => {
        const newStatus = {
            procurement: {
                status: getOptionId(data.procurementStatus),
                estimated: data.procurementEstimated?.toString(),
                actual: data.procurementActual?.toString()
            },
            production: {
                status: getOptionId(data.procurementStatus),
                estimated: data.productionEstimated?.toString(),
                actual: data.productionActual?.toString()
            },
            qa: {
                status: getOptionId(data.procurementStatus),
                estimated: data.qaEstimated?.toString(),
                actual: data.qaActual?.toString()
            }
        };
        onSubmit(newStatus);
    }, [onSubmit]);

    const renderOption = useCallback(
        option => <OrderStatusListItem option={ option }/>,
        []);

    return (
        <FormDialog
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onFormSubmit) }
        >
            <Box className={ classes.container }>
                <FormContainer className={ classes.formContainer }>
                    <Typography variant="h6" className={ classes.stepHeader }>
                        { procurementTitleLabel }
                    </Typography>
                    <RHFAutoComplete
                        rhfControl={ control }
                        name="procurementStatus"
                        label={ statusLabel }
                        options={ orderStatusOptions }
                        getOptionLabel={ option => getOptionLabel(option, LOCALE) }
                        getOptionSelected={ (option, value) => option.id === value.id }
                        required
                        error={ !!errors.procurementStatus }
                        className={ classes.input }
                        renderOption={ renderOption }
                    />
                    <RHFDateField
                        rhfControl={ control }
                        name="procurementEstimated"
                        label={ estimatedLabel }
                        className={ classes.input }
                    />
                    <RHFDateField
                        rhfControl={ control }
                        name="procurementActual"
                        label={ actualLabel }
                        className={ classes.input }
                    />
                </FormContainer>
                <Divider orientation="vertical" flexItem/>
                <FormContainer className={ classes.formContainer }>
                    <Typography variant="h6" className={ classes.stepHeader }>
                        { productionTitleLabel }
                    </Typography>
                    <RHFAutoComplete
                        rhfControl={ control }
                        name="productionStatus"
                        label={ statusLabel }
                        options={ orderStatusOptions }
                        getOptionLabel={ option => getOptionLabel(option, LOCALE) }
                        getOptionSelected={ (option, value) => option.id === value.id }
                        required
                        error={ !!errors.productionStatus }
                        className={ classes.input }
                        renderOption={ renderOption }
                    />
                    <RHFDateField
                        rhfControl={ control }
                        name="productionEstimated"
                        label={ estimatedLabel }
                        className={ classes.input }
                    />
                    <RHFDateField
                        rhfControl={ control }
                        name="productionActual"
                        label={ actualLabel }
                        className={ classes.input }
                    />
                </FormContainer>
                <Divider orientation="vertical" flexItem/>
                <FormContainer className={ classes.formContainer }>
                    <Typography variant="h6" className={ classes.stepHeader }>
                        { qaTitleLabel }
                    </Typography>
                    <RHFAutoComplete
                        rhfControl={ control }
                        name="qaStatus"
                        label={ statusLabel }
                        options={ orderStatusOptions }
                        getOptionLabel={ option => getOptionLabel(option, LOCALE) }
                        getOptionSelected={ (option, value) => option.id === value.id }
                        required
                        error={ !!errors.qaStatus }
                        className={ classes.input }
                        renderOption={ renderOption }
                    />
                    <RHFDateField
                        rhfControl={ control }
                        name="qaEstimated"
                        label={ estimatedLabel }
                        className={ classes.input }
                    />
                    <RHFDateField
                        rhfControl={ control }
                        name="qaActual"
                        label={ actualLabel }
                        className={ classes.input }
                    />
                </FormContainer>
            </Box>
        </FormDialog>
    )
});

OrderStatusDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    titleLabel: PropTypes.string.isRequired,
    status: PropTypes.object
};

export default OrderStatusDialog;