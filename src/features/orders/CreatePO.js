import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreatePODetailsForm from './CreatePODetailsForm.js';
import './styles.css';
import { LANGUAGE } from '../../constants.js';
import CreatePOProductInfo from './CreatePOProductInfo.js';
import { selectCurrentCompany } from '../home/slice.js';
import { fetchPOOptions, submitPO } from './duck/thunks.js';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography } from '@material-ui/core';
import DocumentPreview from '../shared/component/DocumentPreview.js';
import { startNewOrder } from './duck/slice.js';
import { selectNewPO, selectPOError, selectPOPreviewFile, selectPOStatus } from './duck/selectors.js';

const { newOrder, steps } = LANGUAGE.order.createOrder;

export default function CreatePO() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { _id: companyId } = useSelector(selectCurrentCompany);
    const [activeStep, setActiveStep] = useState(0);
    const previewFileUrl = useSelector(selectPOPreviewFile);
    const status = useSelector(selectPOStatus);
    const error = useSelector(selectPOError);
    const { fileName } = useSelector(selectNewPO);

    useEffect(() => {
        dispatch(fetchPOOptions(companyId));
    }, [companyId, dispatch]);

    const onPreviewPrevButtonClick = () =>
        setActiveStep(prevStep => prevStep - 1);

    const onPreviewSubmitButtonClick = () => {
        dispatch(submitPO());
        dispatch(startNewOrder());
        history.push('/home/orders');
    }

    return (
        <Container>
            <DocumentStepper activeStep={ activeStep } steps={ steps }/>
            <Typography variant="h5">{ newOrder }</Typography>
            <hr/>
            { activeStep === 0 && <CreatePODetailsForm setActiveStep={ setActiveStep }/> }
            { activeStep === 1 && <CreatePOProductInfo setActiveStep={ setActiveStep }/> }
            { activeStep === 2 &&
            <DocumentPreview
                onPrevButtonClick={onPreviewPrevButtonClick}
                onSubmitButtonClick={onPreviewSubmitButtonClick}
                previewFileUrl={previewFileUrl}
                status={status}
                error={error}
                fileName={fileName}
            /> }
        </Container>
    )
}