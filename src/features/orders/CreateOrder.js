import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateOrderDetailsForm from './CreateOrderDetailsForm.js';
import './styles.css';
import { LANGUAGE } from '../../constants.js';
import CreateOrderProductInfo from './CreateOrderProductInfo.js';
import { selectCurrentCompany } from '../home/slice.js';
import { fetchPOOptions } from './duck/thunks.js';
import { selectOrderActiveStep, selectOrderSteps } from './duck/selectors.js';
import CreateOrderPreview from './CreateOrderPreview.js';
import { makeStyles } from '@material-ui/core/styles';
import DocumentStepper from '../shared/DocumentStepper.js';

const {newOrder} = LANGUAGE.order.createOrder;

const useStyles = makeStyles({
    stepper: {
        backgroundColor: 'transparent',
        padding: '24px 25%'
    }
});

export default function CreateOrder() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {_id} = useSelector(selectCurrentCompany);
    const steps = useSelector(selectOrderSteps);
    const activeStep = useSelector(selectOrderActiveStep);

    useEffect(() => {
        dispatch(fetchPOOptions(_id));
    }, [_id, dispatch]);

    return (
        <div className="create-order">
            <DocumentStepper
                styles={classes.stepper}
                activeStep={activeStep}
                steps={steps}
            />
            <h4>{newOrder}</h4>
            <hr/>
            {activeStep === 0 && <CreateOrderDetailsForm/>}
            {activeStep === 1 && <CreateOrderProductInfo/>}
            {activeStep === 2 && <CreateOrderPreview/>}
        </div>
    )
}