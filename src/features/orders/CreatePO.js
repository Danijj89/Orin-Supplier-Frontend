import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatePODetailsForm from './CreatePODetailsForm.js';
import './styles.css';
import { LANGUAGE } from '../../constants.js';
import CreatePOProductInfo from './CreatePOProductInfo.js';
import { startNewOrder } from './duck/thunks.js';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography } from '@material-ui/core';
import { selectNewOrder } from './duck/selectors.js';

const { titleLabel, steps } = LANGUAGE.order.createOrder;

export default function CreatePO() {
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);
    const newOrder = useSelector(selectNewOrder);

    useEffect(() => {
        if (!newOrder) {
            dispatch(startNewOrder());
        }
    }, [dispatch, newOrder]);

    return (
        <Container>
            <DocumentStepper activeStep={ activeStep } steps={ steps }/>
            <Typography variant="h5">{ titleLabel }</Typography>
            <hr/>
            { newOrder && activeStep === 0 && <CreatePODetailsForm setActiveStep={ setActiveStep }/> }
            { activeStep === 1 && <CreatePOProductInfo setActiveStep={ setActiveStep }/> }
        </Container>
    )
}