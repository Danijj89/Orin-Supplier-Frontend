import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startNewCI, submitCI } from './duck/thunks.js';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import CreateCIDetailsForm from './CreateCIDetailsForm.js';
import CreateCIProductInfo from './CreateCIProductInfo.js';
import { selectCIError, selectCIFilePreview, selectCIStatus, selectNewCI } from './duck/selectors.js';

const { title, steps } = LANGUAGE.commercialInvoice.createCI;

export default function CreateCI() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);

    const { search } = useLocation();
    const currOrderId = new URLSearchParams(search).get('order');

    const previewFileUrl = useSelector(selectCIFilePreview);
    const status = useSelector(selectCIStatus);
    const error = useSelector(selectCIError);
    const newCI = useSelector(selectNewCI);

    useEffect(() => {
        if (!newCI && status === 'IDLE') {
            dispatch(startNewCI(currOrderId));
        }
    }, [dispatch, currOrderId, status, newCI]);

    const onPreviewPrevButtonClick = () =>
        setActiveStep(step => step - 1);

    const onPreviewSubmitButtonClick = () => {
        dispatch(submitCI());
        history.push(`/home/orders/${ currOrderId }/1`);
    }

    return (
        <Container>
            <DocumentStepper steps={steps} activeStep={activeStep} />
            <Typography variant="h5">{title}</Typography>
            <hr/>
            {newCI && activeStep === 0 && <CreateCIDetailsForm setActiveStep={setActiveStep}/>}
            {activeStep === 1 && <CreateCIProductInfo setActiveStep={setActiveStep}/>}
        </Container>
    )
}