import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCompany } from '../home/slice.js';
import { LANGUAGE } from '../../constants.js';
import { fetchPLOptions, submitPL } from './duck/thunks.js';
import POService from '../orders/services.js';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography } from '@material-ui/core';
import CreatePLDetailsForm from './CreatePLDetailsForm.js';
import { selectSelectedOrder } from '../orders/duck/selectors.js';
import { setCurrentPO } from '../orders/duck/slice.js';
import CIService from '../commercial_invoice/services.js';
import { selectCurrentCI, selectNewPL, selectPLError, selectPLPreviewFile, selectPLStatus } from './duck/selectors.js';
import { setCurrentCI, startNewPL } from './duck/slice.js';
import CreatePLProductInfo from './CreatePLProductInfo.js';
import DocumentPreview from '../shared/components/DocumentPreview.js';

const { steps, title } = LANGUAGE.packingList.createPL;

export default function CreatePL() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { _id: companyId } = useSelector(selectCurrentCompany);
    const [activeStep, setActiveStep] = useState(0);
    const order = useSelector(selectSelectedOrder);
    const { search } = useLocation();
    const currOrderId = new URLSearchParams(search).get('order');
    const ci = useSelector(selectCurrentCI);
    const previewFileUrl = useSelector(selectPLPreviewFile);
    const status = useSelector(selectPLStatus);
    const error = useSelector(selectPLError);
    const { fileName } = useSelector(selectNewPL);

    useEffect(() => {
        const fetchOrderById = async () => {
            const order = await POService.fetchOrderById(currOrderId);
            if (!(order && order.documents.CI)) history.push(`/home`);
            dispatch(setCurrentPO(order));
        };
        const fetchCIById = async (id) => {
            const fetchedCI = await CIService.fetchCIById(id);
            dispatch(setCurrentCI(fetchedCI));
        };
        dispatch(fetchPLOptions(companyId));
        if (!order) fetchOrderById().then();
        if (order && !ci) fetchCIById(order.documents.CI._id).then();
    }, [companyId, dispatch, history, currOrderId, order, ci]);

    const onPreviewPrevButtonClick = () =>
        setActiveStep(prevStep => prevStep - 1);

    const onPreviewSubmitButtonClick = () => {
        dispatch(submitPL());
        dispatch(startNewPL());
        history.push(`/home/orders/${order._id}/1`);
    }

    return (
        <Container>
            <DocumentStepper steps={steps} activeStep={activeStep} />
            <Typography variant="h5">{title}</Typography>
            <hr/>
            {activeStep === 0 && <CreatePLDetailsForm setActiveStep={setActiveStep}/>}
            {activeStep === 1 && <CreatePLProductInfo setActiveStep={setActiveStep}/>}
            {activeStep === 2 && <DocumentPreview
                onPrevButtonClick={onPreviewPrevButtonClick}
                onSubmitButtonClick={onPreviewSubmitButtonClick}
                previewFileUrl={previewFileUrl}
                status={status}
                error={error}
                fileName={fileName}
            />}
        </Container>
    )
}