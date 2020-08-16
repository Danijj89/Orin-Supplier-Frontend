import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateOrderDetailsForm from './CreateOrderDetailsForm.js';
import './styles.css';
import { LANGUAGE } from '../../constants.js';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CreateOrderProductInfo from './CreateOrderProductInfo.js';
import { selectCurrentCompany } from '../home/slice.js';
import { fetchPOOptions } from './duck/thunks.js';
import { selectOrderActiveStep, selectOrderSteps } from './duck/selectors.js';
import CreateOrderPreview from './CreateOrderPreview.js';
import { startNewOrder } from './duck/slice.js';

const {newOrder} = LANGUAGE.createOrder;

export default function CreateOrder() {
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
                <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    children={renderedSteps}
                    style={{backgroundColor: "transparent"}}
                >
                </Stepper>
            </div>
            <h4>{newOrder}</h4>
            <hr/>
            {activeStep === 0 && <CreateOrderDetailsForm />}
            {activeStep === 1 && <CreateOrderProductInfo />}
            {activeStep === 2 && <CreateOrderPreview />}
        </div>
    )
}