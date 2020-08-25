import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCompany } from '../home/slice.js';
import { fetchCIOptions } from './duck/thunks.js';
import { selectCIActiveStep, selectCISteps } from './duck/selectors.js';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import CreateCIDetailsForm from './CreateCIDetailsForm.js';
import CreateCIProductInfo from './CreateCIProductInfo.js';
import CreateCIPreview from './CreateCIPreview.js';
import { useLocation } from 'react-router-dom';
import { selectAllOrders } from '../orders/duck/slice.js';
import OrderService from '../orders/services.js';

const { title } = LANGUAGE.commercialInvoice.createCI;

export default function CreateCI() {
    const dispatch = useDispatch();
    const { _id } = useSelector(selectCurrentCompany);
    const steps = useSelector(selectCISteps);
    const activeStep = useSelector(selectCIActiveStep);

    const { search } = useLocation();
    const currOrderId = new URLSearchParams(search).get('order');
    const orders = useSelector(selectAllOrders);
    const [currOrder, setCurrOrder] = useState(null);
    const mounted = useRef();

    useEffect(() => {
        mounted.current = true;
        dispatch(fetchCIOptions(_id));
        const fetchOrderById = async () => {
            const order = await OrderService.fetchOrderById(currOrderId);
            if (mounted.current) {
                setCurrOrder(order);
            }
        };
        if (orders?.length) setCurrOrder(orders.find(order => order._id === currOrderId));
        else fetchOrderById().then();
        return () => { mounted.current = false };
    }, [_id, dispatch, currOrderId, orders]);

    return (
        <Container>
            <DocumentStepper steps={steps} activeStep={activeStep} />
            <Typography variant="h5">{title}</Typography>
            <hr/>
            {currOrder && activeStep === 0 && <CreateCIDetailsForm order={currOrder}/>}
            {currOrder && activeStep === 1 && <CreateCIProductInfo order={currOrder}/>}
            {currOrder && activeStep === 2 && <CreateCIPreview order={currOrder}/>}
        </Container>
    )
}