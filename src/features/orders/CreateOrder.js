import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateOrderDetailsForm from './CreateOrderDetailsForm.js';
import './styles.css';
import { LANGUAGE } from '../../constants.js';
import { Step, StepLabel } from '@material-ui/core';
import CreateOrderProductInfo from './CreateOrderProductInfo.js';
import { selectCurrentCompany } from '../home/slice.js';
import { fetchPOOptions } from './duck/thunks.js';
import { selectOrderActiveStep, selectOrderSteps } from './duck/selectors.js';
import CreateOrderPreview from './CreateOrderPreview.js';
import { startNewOrder } from './duck/slice.js';
import { makeStyles } from '@material-ui/core/styles';
import DocumentStepper from '../shared/DocumentStepper.js';

const { newOrder } = LANGUAGE.order.createOrder;

const useStyles = makeStyles({
    stepper: {
        backgroundColor: 'transparent',
        padding: '24px 25%'
    }
});

export default function CreateOrder() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { _id } = useSelector(selectCurrentCompany);

    useEffect(() => {
        dispatch(startNewOrder());
        dispatch(fetchPOOptions(_id));
    }, [_id, dispatch]);

    const steps = useSelector(selectOrderSteps);
    const activeStep = useSelector(selectOrderActiveStep);

    const renderedSteps = steps.map((label) => (
        <Step key={label}>
            <StepLabel>{label}</StepLabel>
        </Step>
    ));

    return (
        <div className="create-order">
            <div className="create-order-stepper">
                <DocumentStepper
                    styles={classes.stepper}
                    activeStep={activeStep}
                    renderedSteps={renderedSteps}
                />
            </div>
            <h4>{newOrder}</h4>
            <hr/>
            {activeStep === 0 && <CreateOrderDetailsForm />}
            {activeStep === 1 && <CreateOrderProductInfo />}
            {activeStep === 2 && <CreateOrderPreview />}
        </div>
    )
}