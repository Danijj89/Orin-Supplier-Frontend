import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCompany } from '../home/slice.js';
import { LANGUAGE } from '../../constants.js';
import { fetchPLOptions } from './duck/thunks.js';
import OrderService from '../orders/services.js';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography } from '@material-ui/core';
import CreatePLDetailsForm from './CreatePLDetailsForm.js';
import { selectSelectedOrder } from '../orders/duck/selectors.js';
import { selectOrder } from '../orders/duck/slice.js';
import CIService from '../commercial_invoice/services.js';

const { steps, title } = LANGUAGE.packingList.createPL;

export default function CreatePL() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { _id: companyId } = useSelector(selectCurrentCompany);
    const [activeStep, setActiveStep] = useState(0);
    const order = useSelector(selectSelectedOrder);
    const { search } = useLocation();
    const currOrderId = new URLSearchParams(search).get('order');
    const [ci, setCi] = useState(null);

    const mounted = useRef();

    useEffect(() => {
        const fetchOrderById = async () => {
            const order = await OrderService.fetchOrderById(currOrderId);
            if (!(order && order.documents.CI)) history.push(`/home`);
            dispatch(selectOrder(order));
        };
        const fetchCIById = async (id) => await CIService.fetchCIById(id);
        if (!mounted) {
            dispatch(fetchPLOptions(companyId));
        }
        if (!order) fetchOrderById().then();
        if (order && !ci) {
            const fetchedCI = fetchCIById(order.documents.CI._id).then();
            setCi(fetchedCI);
        }
    }, [companyId, dispatch, history, currOrderId, order, ci]);

    return (
        <Container>
            <DocumentStepper steps={steps} activeStep={activeStep} />
            <Typography variant="h5">{title}</Typography>
            <hr/>
            {ci && activeStep === 0 && <CreatePLDetailsForm ci={ci} setActiveStep={setActiveStep}/>}
            {/*{currOrder && activeStep === 1 && <CreateCIProductInfo order={currOrder}/>}*/}
            {/*{currOrder && activeStep === 2 && <CreateCIPreview order={currOrder}/>}*/}
        </Container>
    )
}