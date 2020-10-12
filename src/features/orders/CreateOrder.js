import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreateOrderDetails from './CreateOrderDetails.js';
import { LANGUAGE } from '../../app/constants.js';
import CreatePOProductInfo from './CreatePOProductInfo.js';
import { startNewOrder } from './duck/thunks.js';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography, Divider } from '@material-ui/core';
import { selectCurrentOrderId, selectNewOrder, selectOrderError, selectOrderStatus } from './duck/selectors.js';
import Loader from '../shared/displays/Loader.js';
import ErrorMessage from '../shared/displays/ErrorMessage.js';
import useSessionStorage from '../shared/hooks/useSessionStorage.js';
import { SESSION_NEW_ORDER } from '../../app/sessionKeys.js';
import { cleanNewOrder } from './duck/slice.js';
import { selectCurrentCompany } from '../home/duck/selectors.js';

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

const { titleLabel, stepLabelsMap } = LANGUAGE.order.createOrder;

export default function CreateOrder() {
    const dispatch = useDispatch();
    const { step } = useParams();
    const [activeStep, setActiveStep] = useState(getCurrentStep(step));
    const newOrder = useSelector(selectNewOrder);
    const company = useSelector(selectCurrentCompany);
    const status = useSelector(selectOrderStatus);
    const error = useSelector(selectOrderError);
    const currentOrderId = useSelector(selectCurrentOrderId);

    useEffect(() => {
        dispatch(startNewOrder());
        return () => dispatch(cleanNewOrder);
    }, [dispatch]);

    let rendered;
    if (status === 'PENDING' ) rendered = <Loader/>;
    else if (status === 'REJECTED') rendered = <ErrorMessage errors={ [error] }/>;
    else if (currentOrderId) rendered = <Redirect to={ `/home/orders/${ currentOrderId }/0` }/>
    else if (company && newOrder && activeStep === 0)
        rendered =
            <CreateOrderDetails
                setActiveStep={ setActiveStep }
                company={ company }
            />;
    else if (company && newOrder && activeStep === 1)
        rendered =
            <CreatePOProductInfo
                setActiveStep={ setActiveStep }
            />
    else if (activeStep === -1) rendered = <Redirect to={ '/home/orders' }/>

    return (
        <Container>
            <DocumentStepper activeStep={ activeStep } steps={ Object.values(stepLabelsMap) }/>
            <Typography variant="h5">{ titleLabel }</Typography>
            <Divider/>
            { rendered }
        </Container>
    )
}