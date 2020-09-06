import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreatePODetailsForm from './CreatePODetailsForm.js';
import './styles.css';
import { LANGUAGE } from '../../constants.js';
import CreatePOProductInfo from './CreatePOProductInfo.js';
import { startNewPO, submitPO } from './duck/thunks.js';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography } from '@material-ui/core';
import DocumentPreview from '../shared/components/DocumentPreview.js';
import { selectNewPO, selectPOError, selectPOPreviewFile, selectPOStatus } from './duck/selectors.js';

const { newOrder, steps } = LANGUAGE.order.createOrder;

export default function CreatePO() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const previewFileUrl = useSelector(selectPOPreviewFile);
    const status = useSelector(selectPOStatus);
    const error = useSelector(selectPOError);
    const newPO = useSelector(selectNewPO);

    useEffect(() => {
        if (!newPO && status === 'IDLE') {
            dispatch(startNewPO());
        }
    }, [dispatch, newPO, status]);

    const onPreviewPrevButtonClick = () =>
        setActiveStep(prevStep => prevStep - 1);

    const onPreviewSubmitButtonClick = () => {
        dispatch(submitPO());
        history.push('/home/orders');
    }

    return (
        <Container>
            <DocumentStepper activeStep={ activeStep } steps={ steps }/>
            <Typography variant="h5">{ newOrder }</Typography>
            <hr/>
            { newPO && activeStep === 0 && <CreatePODetailsForm setActiveStep={ setActiveStep }/> }
            { activeStep === 1 && <CreatePOProductInfo setActiveStep={ setActiveStep }/> }
            { activeStep === 2 &&
            <DocumentPreview
                onPrevButtonClick={onPreviewPrevButtonClick}
                onSubmitButtonClick={onPreviewSubmitButtonClick}
                previewFileUrl={previewFileUrl}
                status={status}
                error={error}
                fileName={newPO.fileName}
            /> }
        </Container>
    )
}