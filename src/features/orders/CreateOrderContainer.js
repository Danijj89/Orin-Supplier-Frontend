import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreateOrderDetails from './CreateOrderDetails.js';
import { LANGUAGE } from '../../app/constants.js';
import CreatePOProductInfo from './CreatePOProductInfo.js';
import { startNewOrder } from './duck/thunks.js';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography, Divider, Box } from '@material-ui/core';
import { selectCurrentOrderId, selectNewOrder, selectOrderError, selectOrderStatus } from './duck/selectors.js';
import Loader from '../shared/displays/Loader.js';
import ErrorMessage from '../shared/displays/ErrorMessage.js';
import { cleanNewOrder } from './duck/slice.js';
import { selectCurrentCompany } from '../home/duck/selectors.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import { isLoading } from '../shared/utils/store.js';
import { selectAllClients, selectClientStatus } from '../clients/duck/selectors.js';
import { fetchClients } from '../clients/duck/thunks.js';
import { useForm } from 'react-hook-form';
import { dateToYYMMDD } from '../shared/utils/format.js';
import useSessionStorage from '../shared/hooks/useSessionStorage.js';
import { SESSION_NEW_ORDER } from '../../app/sessionKeys.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';

function getCurrentStep(stepLabel) {
    switch (stepLabel) {
        case 'details':
            return 0;
        case 'products':
            return 1;
        default:
            return -1;
    }
}

const { titleLabel, stepLabelsMap } = LANGUAGE.order.createOrder;

export default function CreateOrder() {
    const dispatch = useDispatch();
    const { step } = useParams();
    const userId = useSelector(selectCurrentUserId);
    const newOrder = useSelector(selectNewOrder);
    const company = useSelector(selectCurrentCompany);
    const clients = useSelector(selectAllClients);
    const orderStatus = useSelector(selectOrderStatus);
    const clientStatus = useSelector(selectClientStatus);
    const error = useSelector(selectOrderError);
    const currentOrderId = useSelector(selectCurrentOrderId);
    const loading = isLoading([orderStatus, clientStatus]);
    const [activeStep, setActiveStep] = useState(getCurrentStep(step));
    const [order, setOrder] = useSessionStorage(SESSION_NEW_ORDER, newOrder);
    console.log(order);

    const { register, control, watch, setValue, getValues, errors, reset } = useForm({
        mode: 'onSubmit',
    });

    useEffect(() => {
        if (company) dispatch(startNewOrder({ userId, companyId: company._id }));
        if (company && clientStatus === 'IDLE') dispatch(fetchClients(company._id));
        if (!order && newOrder) reset({
            ref: order.ref,
            from: order.from,
            fromAdd: order.fromAdd,
            to: order.to || null,
            toAdd: order.toAdd || null,
            date: dateToYYMMDD(order.date),
            crd: dateToYYMMDD(order.crd),
            incoterm: order.incoterm || null,
            pay: order.pay,
            clientRef: order.clientRef,
            notes: order.notes,
            pol: order.pol,
            pod: order.pod,
            del: order.del,
            carrier: order.carrier
        });
        return () => dispatch(cleanNewOrder);
    }, [dispatch, company, userId, clientStatus, reset]);

    const onButtonNextClick = (data) => {
        // data.to = customerMap[chosenCustomer].id;
        // dispatch(submitOrderDetails(data));
        // setActiveStep((prevStep) => prevStep + 1);
    };

    const onButtonCancelClick = () => {
        // dispatch(cleanNewOrder());
        // history.goBack();
    }

    return (
        <Box>
            <DocumentStepper activeStep={ activeStep } steps={ Object.values(stepLabelsMap) }/>
            <Container>
                <Typography variant="h5">{ titleLabel }</Typography>
                <Divider/>
                { activeStep === -1 && <Redirect to={ '/home/orders' }/> }
                { currentOrderId && <Redirect to={ `/home/orders/${ currentOrderId }/0` }/> }
                { loading && <Loader/> }
                { error && <ErrorMessage errors={ [error] }/> }
                { company && clients && newOrder && activeStep === 0 && <CreateOrderDetails
                    register={ register }
                    control={ control }
                    watch={ watch }
                    setValue={ setValue }
                    getValues={ getValues }
                    errors={ errors }
                    company={ company }
                    clients={ clients }
                /> }
                { company && newOrder && activeStep === 1 && <CreatePOProductInfo
                    setActiveStep={ setActiveStep }
                /> }
            </Container>
            <Box>
                <ThemedButton>cancel</ThemedButton>
                <ThemedButton>next</ThemedButton>
            </Box>
        </Box>
    );
}