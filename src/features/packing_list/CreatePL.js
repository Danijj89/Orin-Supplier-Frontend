import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCompany } from '../home/slice.js';
import { LANGUAGE } from '../../constants.js';
import { fetchPLOptions } from './duck/thunks.js';
import POService from '../orders/services.js';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography } from '@material-ui/core';
import CreatePLDetailsForm from './CreatePLDetailsForm.js';
import { selectSelectedOrder } from '../orders/duck/selectors.js';
import { selectOrder } from '../orders/duck/slice.js';
import CIService from '../commercial_invoice/services.js';
import { selectCurrentCI } from './duck/selectors.js';
import { setCurrentCI } from './duck/slice.js';
import CreatePLProductInfo from './CreatePLProductInfo.js';
import CreatePLPreview from './CreatePLPreview.js';

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

    useEffect(() => {
        const fetchOrderById = async () => {
            const order = await POService.fetchOrderById(currOrderId);
            if (!(order && order.documents.CI)) history.push(`/home`);
            dispatch(selectOrder(order));
        };
        const fetchCIById = async (id) => {
            const fetchedCI = await CIService.fetchCIById(id);
            dispatch(setCurrentCI(fetchedCI));
        };
        dispatch(fetchPLOptions(companyId));
        if (!order) fetchOrderById().then();
        if (order && !ci) fetchCIById(order.documents.CI._id).then();
    }, [companyId, dispatch, history, currOrderId, order, ci]);

    return (
        <Container>
            <DocumentStepper steps={steps} activeStep={activeStep} />
            <Typography variant="h5">{title}</Typography>
            <hr/>
            {activeStep === 0 && <CreatePLDetailsForm setActiveStep={setActiveStep}/>}
            {activeStep === 1 && <CreatePLProductInfo setActiveStep={setActiveStep}/>}
            {activeStep === 2 && <CreatePLPreview setActiveStep={setActiveStep}/>}
        </Container>
    )
}