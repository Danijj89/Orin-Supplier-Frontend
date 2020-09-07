import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGE } from '../../constants.js';
import { startNewPL, submitPL } from './duck/thunks.js';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography } from '@material-ui/core';
import CreatePLDetailsForm from './CreatePLDetailsForm.js';
import { selectNewPL, selectPLError, selectPLPreviewFile, selectPLStatus } from './duck/selectors.js';
import CreatePLProductInfo from './CreatePLProductInfo.js';
import DocumentPreview from '../shared/components/DocumentPreview.js';

const { steps, title } = LANGUAGE.packingList.createPL;

export default function CreatePL() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);
    const { search } = useLocation();
    const currOrderId = new URLSearchParams(search).get('order');
    const previewFileUrl = useSelector(selectPLPreviewFile);
    const status = useSelector(selectPLStatus);
    const error = useSelector(selectPLError);
    const newPL = useSelector(selectNewPL);

    useEffect(() => {
        if (!newPL && status === 'IDLE') dispatch(startNewPL(currOrderId));
    }, [dispatch, currOrderId, newPL, status]);

    const onPreviewPrevButtonClick = () =>
        setActiveStep(prevStep => prevStep - 1);

    const onPreviewSubmitButtonClick = () => {
        dispatch(submitPL());
        history.push(`/home/orders/${currOrderId}/1`);
    }

    return (
        <Container>
            <DocumentStepper steps={steps} activeStep={activeStep} />
            <Typography variant="h5">{title}</Typography>
            <hr/>
            { newPL && activeStep === 0 && <CreatePLDetailsForm setActiveStep={setActiveStep}/>}
            {activeStep === 1 && <CreatePLProductInfo setActiveStep={setActiveStep}/>}
            {activeStep === 2 && <DocumentPreview
                onPrevButtonClick={onPreviewPrevButtonClick}
                onSubmitButtonClick={onPreviewSubmitButtonClick}
                previewFileUrl={previewFileUrl}
                status={status}
                error={error}
                fileName={newPL.fileName}
            />}
        </Container>
    )
}