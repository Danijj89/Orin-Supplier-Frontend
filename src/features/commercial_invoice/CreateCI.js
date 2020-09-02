import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCompany } from '../home/slice.js';
import { fetchCIOptions, submitCI } from './duck/thunks.js';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import CreateCIDetailsForm from './CreateCIDetailsForm.js';
import CreateCIProductInfo from './CreateCIProductInfo.js';
import { selectAllOrders, setCurrentPO } from '../orders/duck/slice.js';
import POService from '../orders/services.js';
import { selectSelectedOrder } from '../orders/duck/selectors.js';
import DocumentPreview from '../shared/components/DocumentPreview.js';
import { setCIDataFromPO, startNewCI } from './duck/slice.js';
import { selectCIError, selectCIFilePreview, selectCIStatus, selectNewCI } from './duck/selectors.js';

const { title, steps } = LANGUAGE.commercialInvoice.createCI;

export default function CreateCI() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { _id: companyId } = useSelector(selectCurrentCompany);
    const [activeStep, setActiveStep] = useState(0);
    const order = useSelector(selectSelectedOrder);

    const { search } = useLocation();
    const currOrderId = new URLSearchParams(search).get('order');
    const orders = useSelector(selectAllOrders);
    const mounted = useRef();

    const previewFileUrl = useSelector(selectCIFilePreview);
    const status = useSelector(selectCIStatus);
    const error = useSelector(selectCIError);
    const { fileName } = useSelector(selectNewCI);

    useEffect(() => {
        // console.log(order);
        const fetchOrderById = async () => {
            const order = await POService.fetchOrderById(currOrderId);
            dispatch(setCurrentPO(order));
            dispatch(setCIDataFromPO(order));
        };
        dispatch(fetchCIOptions(companyId));
        if (orders && orders.length > 0) {
            const order = orders.find(order => order._id === currOrderId);
            dispatch(setCurrentPO(order));
            dispatch(setCIDataFromPO(order));
        }
        if (!order) fetchOrderById().then();
    }, [companyId, dispatch, currOrderId, orders, order]);

    const onPreviewPrevButtonClick = () =>
        setActiveStep(step => step - 1);

    const onPreviewSubmitButtonClick = () => {
        dispatch(submitCI());
        dispatch(startNewCI());
        history.push(`/home/orders/${ order._id }`);
    }

    return (
        <Container>
            <DocumentStepper steps={steps} activeStep={activeStep} />
            <Typography variant="h5">{title}</Typography>
            <hr/>
            {order && activeStep === 0 && <CreateCIDetailsForm setActiveStep={setActiveStep}/>}
            {/*{currOrder && activeStep === 1 && <CreateCIProductInfo order={currOrder}/>}*/}
            {activeStep === 2 &&
            <DocumentPreview
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