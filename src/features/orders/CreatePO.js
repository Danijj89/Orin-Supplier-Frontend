import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateOrderDetailsForm from './CreateOrderDetailsForm.js';
import './styles.css';
import { LANGUAGE } from '../../constants.js';
import CreateOrderProductInfo from './CreateOrderProductInfo.js';
import { selectCurrentCompany } from '../home/slice.js';
import { fetchPOOptions } from './duck/thunks.js';
import CreateOrderPreview from './CreateOrderPreview.js';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography } from '@material-ui/core';

const { newOrder, steps } = LANGUAGE.order.createOrder;

export default function CreatePO() {
    const dispatch = useDispatch();
    const { _id: companyId } = useSelector(selectCurrentCompany);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        dispatch(fetchPOOptions(companyId));
    }, [companyId, dispatch]);

    return (
        <Container className="create-order">
            <DocumentStepper activeStep={ activeStep } steps={ steps }/>
            <Typography variant="h5">{ newOrder }</Typography>
            <hr/>
            { activeStep === 0 && <CreateOrderDetailsForm setActiveStep={setActiveStep}/> }
            { activeStep === 1 && <CreateOrderProductInfo setActiveStep={setActiveStep}/> }
            { activeStep === 2 && <CreateOrderPreview setActiveStep={setActiveStep}/> }
        </Container>
    )
}