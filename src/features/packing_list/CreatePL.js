import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCompany } from '../home/slice.js';
import { LANGUAGE } from '../../constants.js';
import { selectAllOrders } from '../orders/duck/slice.js';
import { fetchPLOptions } from './duck/thunks.js';
import OrderService from '../orders/services.js';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography } from '@material-ui/core';
import CreatePLDetailsForm from './CreatePLDetailsForm.js';

const { steps, title } = LANGUAGE.packingList.createPL;

export default function CreatePL() {

    const dispatch = useDispatch();
    const { _id } = useSelector(selectCurrentCompany);
    const [activeStep, setActiveStep] = useState(0);

    const { search } = useLocation();
    const currOrderId = new URLSearchParams(search).get('order');
    const [currOrder, setCurrOrder] = useState(null);
    const mounted = useRef();

    useEffect(() => {
        mounted.current = true;
        dispatch(fetchPLOptions(_id));
        const fetchOrderById = async () => {
            const order = await OrderService.fetchOrderById(currOrderId);
            if (mounted.current) {
                setCurrOrder(order);
            }
        };
        fetchOrderById().then();
        return () => { mounted.current = false };
    }, [_id, dispatch, currOrderId]);

    return (
        <Container>
            <DocumentStepper steps={steps} activeStep={activeStep} />
            <Typography variant="h5">{title}</Typography>
            <hr/>
            {currOrder && activeStep === 0 && <CreatePLDetailsForm order={currOrder} setActiveStep={setActiveStep}/>}
            {/*{currOrder && activeStep === 1 && <CreateCIProductInfo order={currOrder}/>}*/}
            {/*{currOrder && activeStep === 2 && <CreateCIPreview order={currOrder}/>}*/}
        </Container>
    )
}