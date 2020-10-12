import React, { useState } from 'react';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Box, Paper, Divider, Typography } from '@material-ui/core';
import CreateOrderDetails from './CreateOrderDetails.js';
import CreatePOProductInfo from './CreatePOProductInfo.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { useForm } from 'react-hook-form';
import { dateToYYMMDD } from '../shared/utils/format.js';
import useSessionStorage from '../shared/hooks/useSessionStorage.js';
import { SESSION_NEW_ORDER } from '../../app/sessionKeys.js';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch } from 'react-redux';
import { cleanNewOrder } from './duck/slice.js';

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

const {
    titleLabel,
    stepLabelsMap,
    prevButtonLabel,
    nextButtonLabel
} = LANGUAGE.order.createOrder;

export default function CreateOrder({ newOrder, clients, company }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { step } = useParams();
    const [activeStep, setActiveStep] = useState(getCurrentStep(step));
    const [order, setOrder] = useSessionStorage(SESSION_NEW_ORDER, newOrder);

    const { register, control, watch, setValue, getValues, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            ref: order.ref,
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
            carrier: order.carrier
        }
    });

    const onPrevClick = () => {
        if (activeStep === 0) {
            dispatch(cleanNewOrder());
            history.goBack();
        } else if (activeStep === 1) {
            setOrder(getValues());
            setActiveStep(prevStep => prevStep - 1);
        }
    };

    const onNextClick = (data) => {
        if (activeStep === 0) {
            setOrder(data);
            setActiveStep((prevStep) => prevStep + 1);
            console.log(data);
        }
        // data.to = customerMap[chosenCustomer].id;
        // dispatch(submitOrderDetails(data));
    };


    return (
        <Box>
            { activeStep === -1 && <Redirect to={ '/home/orders' }/> }
            <DocumentStepper activeStep={ activeStep } steps={ Object.values(stepLabelsMap) }/>
            <Typography variant="h5">{ titleLabel }</Typography>
            <Divider/>
            <Paper>
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
                { activeStep === 1 && <CreatePOProductInfo
                    setActiveStep={ setActiveStep }
                /> }
            </Paper>
            <Box>
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