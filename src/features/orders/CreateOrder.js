import React, { useCallback, useEffect, useState } from 'react';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Box, Paper, Divider, Typography } from '@material-ui/core';
import CreateOrderDetails from './CreateOrderDetails.js';
import CreateOrderProducts from './CreateOrderProducts.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { useForm } from 'react-hook-form';
import useSessionStorage from '../shared/hooks/useSessionStorage.js';
import { SESSION_NEW_ORDER } from '../../app/sessionKeys.js';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch } from 'react-redux';
import { cleanNewOrder } from './duck/slice.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { itemUnitsOptions } from '../shared/constants.js';
import ErrorDisplayer from '../shared/components/ErrorDisplay.js';
import { makeStyles } from '@material-ui/core/styles';

function getCurrentStep(stepLabel) {
    switch (stepLabel) {
        case 'details':
            return 0;
        case 'products':
            return 1;
        default:
            return -1;
    }
}

const useStyles = makeStyles((theme) => ({
    footer: {
        position: 'fixed',
        bottom: 0,
        backgroundColor: theme.palette.tertiary['700'],
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        width: '100%'
    }
}))

const {
    titleLabel,
    stepLabelsMap,
    prevButtonLabel,
    nextButtonLabel,
    errorMessages
} = LANGUAGE.order.createOrder;

export default function CreateOrder({ newOrder, clients, company }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { step } = useParams();
    const [activeStep, setActiveStep] = useState(getCurrentStep(step));
    const [order, setOrder] = useSessionStorage(SESSION_NEW_ORDER, newOrder);

    const { register, control, watch, setValue, getValues, errors, handleSubmit, clearErrors } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            ref: !order.autoGenerateRef && order.ref,
            from: order.from,
            fromAdd: order.fromAdd,
            to: order.to || null,
            toAdd: order.toAdd || null,
            date: new Date(order.date),
            crd: new Date(order.crd),
            incoterm: order.incoterm || null,
            pay: order.pay,
            clientRef: order.clientRef,
            notes: order.notes,
            pol: order.pol,
            pod: order.pod,
            del: order.del,
            carrier: order.carrier,
            currency: order.currency,
            items: order.items,
            headers: order.headers,
            totalQ: new UnitCounter(itemUnitsOptions, order.totalQ),
            totalA: order.totalA,
            saveItems: order.saveItems,
            autoGenerateRef: order.autoGenerateRef
        }
    });

    const errMessages = Object.values(errors).map(err => err.message);
    console.log(errMessages)

    const validateItems = useCallback((items) => {
        if (activeStep === 0) return true;
        for (const item of items) {
            if (!(item.ref && item.description && item.quantity && item.unit && item.price))
                return errorMessages.missingItemInfo;
        }
        return true;
    }, [activeStep]);

    useEffect(() => {
        register({ name: 'items' }, { validate: validateItems });
        register({ name: 'headers' });
        register({ name: 'totalQ' });
        register({ name: 'totalA' });
        register({ name: 'saveItems' });
    }, [register, validateItems]);

    const onPrevClick = () => {
        if (activeStep === 0) {
            dispatch(cleanNewOrder());
            history.goBack();
        } else if (activeStep === 1) {
            clearErrors();
            //     data.totalQ = data.totalQ.data;
            setOrder(getValues());
            setActiveStep(prevStep => prevStep - 1);
        }
    };

    const onNextClick = (data) => {
        if (activeStep === 0) {
            setOrder(data);
            setActiveStep((prevStep) => prevStep + 1);
            console.log(data);
        } else if (activeStep === 1) {
            // data.to = customerMap[chosenCustomer].id;
            // data.totalQ = data.totalQ.data;
            // dispatch(submitOrder());
        }
    };

    return (
        <Box>
            { activeStep === -1 && <Redirect to={ '/home/orders' }/> }
            <DocumentStepper activeStep={ activeStep } steps={ Object.values(stepLabelsMap) }/>
            <Typography variant="h5">{ titleLabel }</Typography>
            <Divider/>
            <Paper>
                <ErrorDisplayer errors={ errMessages }/>
                { activeStep === 0 && <CreateOrderDetails
                    register={ register }
                    control={ control }
                    watch={ watch }
                    setValue={ setValue }
                    getValues={ getValues }
                    errors={ errors }
                    company={ company }
                    clients={ clients }
                /> }
                { activeStep === 1 && <CreateOrderProducts
                    watch={ watch }
                    control={ control }
                    errors={ errors }
                    setValue={ setValue }
                    register={ register }
                /> }
            </Paper>
            <Box className={ classes.footer }>
                <ThemedButton onClick={ onPrevClick }>
                    { activeStep === 0 ? prevButtonLabel.details : prevButtonLabel.products }
                </ThemedButton>
                <ThemedButton onClick={ handleSubmit(onNextClick) }>
                    { activeStep === 0 ? nextButtonLabel.details : nextButtonLabel.products }
                </ThemedButton>
            </Box>
        </Box>
    )
}