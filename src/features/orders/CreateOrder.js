import React from 'react';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Box, Paper, Divider, Typography } from '@material-ui/core';
import RHFOrderProducts from '../shared/rhf_forms/RHFOrderProducts.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { useForm } from 'react-hook-form';
import useSessionStorage from '../shared/hooks/useSessionStorage.js';
import { SESSION_NEW_ORDER } from '../../app/sessionKeys.js';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { cleanNewOrder } from './duck/slice.js';
import ErrorDisplay from '../shared/components/ErrorDisplay.js';
import { makeStyles } from '@material-ui/core/styles';
import { selectNewOrder } from './duck/selectors.js';
import { createOrder } from './duck/thunks.js';
import { selectCurrentCompany } from '../home/duck/selectors.js';
import { selectClientsMap } from '../clients/duck/selectors.js';
import RHFOrderDetails from '../shared/rhf_forms/RHFOrderDetails.js';

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
        backgroundColor: theme.palette.grey.main,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        width: '100%'
    }
}))

const {
    titleLabel,
    stepLabelsMap,
    prevButtonLabel,
    nextButtonLabel
} = LANGUAGE.order.createOrder;

export default function CreateOrder() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { step } = useParams();
    const newOrder = useSelector(selectNewOrder);
    const company = useSelector(selectCurrentCompany);
    const clients = useSelector(selectClientsMap);
    const [order, setOrder] = useSessionStorage(SESSION_NEW_ORDER, newOrder);

    const rhfMethods = useForm({
        mode: 'onSubmit',
        defaultValues: {
            ref: !order.autoGenerateRef ? order.ref : null,
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
            pol: order.pol || null,
            pod: order.pod || null,
            del: order.del,
            carrier: order.carrier,
            currency: order.currency,
            items: order.items,
            custom1: order.custom1,
            custom2: order.custom2,
            totalQ: order.totalQ,
            totalA: order.totalA,
            saveItems: order.saveItems,
            autoGenerateRef: order.autoGenerateRef,
            createdBy: order.createdBy

        },
        shouldUnregister: false
    });
    const { errors, clearErrors, getValues, handleSubmit } = rhfMethods;

    const errMessages = Object.values(errors).map(err => err.message);

    const onPrevClick = () => {
        if (step === 'details') {
            dispatch(cleanNewOrder());
            history.goBack();
        } else if (step === 'products') {
            clearErrors();
            setOrder(getValues());
            history.push('/home/orders/new/details');
        }
    };

    const onNextClick = () => {
        if (step === 'details') {
            setOrder(getValues());
            history.push('/home/orders/new/products');
        } else if (step === 'products') {
            handleSubmit(onSubmit)();
        }
    };

    const onSubmit = (data) => {
        data.to = data.to._id;
        dispatch(createOrder(data));
        dispatch(cleanNewOrder());
    };

    return (
        <Box>
            { getCurrentStep(step) === -1 && <Redirect to={ '/home/orders' }/> }
            <DocumentStepper activeStep={ getCurrentStep(step) } steps={ Object.values(stepLabelsMap) }/>
            <Typography variant="h5">{ titleLabel }</Typography>
            <Divider/>
            <Paper>
                { errMessages.length > 0 && <ErrorDisplay errors={ errMessages }/> }
                { step === 'details' && <RHFOrderDetails rhfMethods={ rhfMethods } company={company} clients={clients}/> }
                { step === 'products' && <RHFOrderProducts rhfMethods={ rhfMethods }/> }
            </Paper>
            <Box className={ classes.footer }>
                <ThemedButton onClick={ onPrevClick }>
                    { step === 'details' ? prevButtonLabel.details : prevButtonLabel.products }
                </ThemedButton>
                <ThemedButton onClick={ onNextClick }>
                    { step === 'details' ? nextButtonLabel.details : nextButtonLabel.products }
                </ThemedButton>
            </Box>
        </Box>
    )
}