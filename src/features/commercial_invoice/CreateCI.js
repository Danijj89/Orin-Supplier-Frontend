import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCompany } from '../home/slice.js';
import CreateOrderPreview from '../orders/CreateOrderPreview.js';
import { fetchCIOptions } from './duck/thunks.js';
import { selectCIActiveStep, selectCISteps } from './duck/selectors.js';
import { makeStyles } from '@material-ui/core/styles';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import CreateCIDetailsForm from './CreateCIDetailsForm.js';
import CreateCIProductInfo from './CreateCIProductInfo.js';

const { title } = LANGUAGE.commercialInvoice.createCI;

const useStyles = makeStyles({
    stepper: {
        backgroundColor: 'transparent',
        padding: '24px 25%'
    }
});

export default function CreateCI() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { _id } = useSelector(selectCurrentCompany);
    const steps = useSelector(selectCISteps);
    const activeStep = useSelector(selectCIActiveStep);

    useEffect(() => {
        dispatch(fetchCIOptions(_id));
    }, [_id, dispatch]);

    return (
        <Container>
            <DocumentStepper styles={classes.stepper} steps={steps} activeStep={activeStep} />
            <Typography variant="h5">{title}</Typography>
            <hr/>
            {activeStep === 0 && <CreateCIDetailsForm />}
            {activeStep === 1 && <CreateCIProductInfo />}
            {activeStep === 2 && <CreateOrderPreview />}
        </Container>
    )
}