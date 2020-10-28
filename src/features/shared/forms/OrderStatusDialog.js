import React, { useEffect, useRef } from 'react';
import FormDialog from '../wrappers/FormDialog.js';
import { Controller, useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import FormContainer from '../wrappers/FormContainer.js';
import SideAutoComplete from '../inputs/SideAutoComplete.js';
import { orderStatusColors, orderStatusesOptions } from '../constants.js';
import { LANGUAGE } from '../../../app/constants.js';
import { FiberManualRecord as IconCircle } from '@material-ui/icons';
import SideDateField from '../inputs/SideDateField.js';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex'
    },
    formContainer: {
        padding: theme.spacing(1)
    },
    stepHeader: {
        width: '100%',
        textAlign: 'center'
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
} = LANGUAGE.shared.forms.orderStatusDialog;

export default function OrderStatusDialog(
    {
        isOpen,
        onSubmit,
        onCancel,
        submitLabel,
        status,
        titleLabel
    }) {
    const classes = useStyles();
    const { procurement, production, qa } = status;
    const { control, handleSubmit, errors, watch, setValue, reset } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            procurementStatus: procurement.status,
            productionStatus: production.status,
            qaStatus: qa.status,
            procurementEstimated: procurement.estimated,
            productionEstimated: production.estimated,
            qaEstimated: qa.estimated,
            procurementActual: procurement.actual,
            productionActual: production.actual,
            qaActual: qa.actual
        },
        shouldUnregister: false
    });

    const procurementStatus = watch('procurementStatus');
    const productionStatus = watch('productionStatus');
    const qaStatus = watch('qaStatus');

    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
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
            mounted.current = true;
        }
        if (procurementStatus === 'Completed') setValue('procurementActual', new Date());
        else if (productionStatus === 'Completed') setValue('productionActual', new Date());
        else if (qaStatus === 'Completed') setValue('qaActual', new Date());
    }, [procurementStatus, productionStatus, qaStatus, setValue, reset, procurement, production, qa]);

    const onFormSubmit = data => {
        const newStatus = {
            procurement: {
                status: data.procurementStatus,
                estimated: data.procurementEstimated?.toString(),
                actual: data.procurementActual?.toString()
            },
            production: {
                status: data.productionStatus,
                estimated: data.productionEstimated?.toString(),
                actual: data.productionActual?.toString()
            },
            qa: {
                status: data.qaStatus,
                estimated: data.qaEstimated?.toString(),
                actual: data.qaActual?.toString()
            }
        };
        onSubmit(newStatus);
    };

    const StepHeader = ({ label }) =>
        <Typography variant="h6" className={ classes.stepHeader }>{ label }</Typography>;

    const StatusDropdown = ({ name }) =>
        <Controller
            render={ (props) =>
                <SideAutoComplete
                    { ...props }
                    className={ classes.input }
                    options={ orderStatusesOptions }
                    label={ statusLabel }
                    renderOption={ option =>
                        <>
                            <ListItemIcon>
                                <IconCircle
                                    style={ { color: orderStatusColors[option] } }
                                    fontSize="small"
                                />
                            </ListItemIcon>
                            <ListItemText>{ option }</ListItemText>
                        </>
                    }
                    error={ !!errors[name] }
                    required
                />
            }
            name={ name }
            control={ control }
            rules={ { required: true } }
        />;

    const DateField = ({ name, label }) =>
        <Controller
            render={ props =>
                <SideDateField
                    { ...props }
                    label={ label }
                    className={ classes.input }
                />
            }
            name={name}
            control={ control }
        />;

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
                    <StepHeader label={ procurementTitleLabel }/>
                    <StatusDropdown name="procurementStatus"/>
                    <DateField name="procurementEstimated" label={estimatedLabel} />
                    <DateField name="procurementActual" label={actualLabel} />
                </FormContainer>
                <Divider orientation="vertical" flexItem/>
                <FormContainer className={ classes.formContainer }>
                    <StepHeader label={ productionTitleLabel }/>
                    <StatusDropdown name="productionStatus"/>
                    <DateField name="productionEstimated" label={estimatedLabel} />
                    <DateField name="productionActual" label={actualLabel} />
                </FormContainer>
                <Divider orientation="vertical" flexItem/>
                <FormContainer className={ classes.formContainer }>
                    <StepHeader label={ qaTitleLabel }/>
                    <StatusDropdown name="qaStatus"/>
                    <DateField name="qaEstimated" label={estimatedLabel} />
                    <DateField name="qaActual" label={actualLabel} />
                </FormContainer>
            </Box>
        </FormDialog>
    )
}

OrderStatusDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    titleLabel: PropTypes.string.isRequired,
    status: PropTypes.object
};