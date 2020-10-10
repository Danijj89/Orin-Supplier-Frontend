import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreatePODetailsForm from './CreatePODetailsForm.js';
import './styles.css';
import { LANGUAGE } from '../../constants.js';
import CreatePOProductInfo from './CreatePOProductInfo.js';
import { startNewOrder } from './duck/thunks.js';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography, Divider } from '@material-ui/core';
import { selectCurrentOrderId, selectNewOrder, selectOrderError, selectOrderStatus } from './duck/selectors.js';
import Loader from '../shared/displays/Loader.js';

const { titleLabel, steps } = LANGUAGE.order.createOrder;

export default function CreatePO() {
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);
    const newOrder = useSelector(selectNewOrder);
    const status = useSelector(selectOrderStatus);
    const error = useSelector(selectOrderError);
    const currentOrderId = useSelector(selectCurrentOrderId);

    useEffect(() => {
        if (!newOrder) {
            dispatch(startNewOrder());
        }
    }, [dispatch, newOrder]);

    let rendered;
    if (status === 'PENDING') rendered = <Loader />;
    else if (status === 'REJECTED') rendered = <Typography>{error}</Typography>;
    else if (currentOrderId) rendered = <Redirect to={`/home/orders/${ currentOrderId }/0`} />
    else if (newOrder && activeStep === 0) rendered = <CreatePODetailsForm setActiveStep={ setActiveStep }/>;
    else if (activeStep === 1) rendered = <CreatePOProductInfo setActiveStep={ setActiveStep }/>

    return (
        <Container>
            <DocumentStepper activeStep={ activeStep } steps={ steps }/>
            <Typography variant="h5">{ titleLabel }</Typography>
            <Divider/>
            {rendered}
        </Container>
    )
}