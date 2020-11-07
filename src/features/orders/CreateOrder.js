import React, { useEffect } from 'react';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Box, Paper, Divider, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import useSessionStorage from '../shared/hooks/useSessionStorage.js';
import { SESSION_NEW_ORDER } from '../../app/sessionKeys.js';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { cleanNewOrder } from './duck/slice.js';
import ErrorDisplay from '../shared/components/ErrorDisplay.js';
import { selectNewOrder } from './duck/selectors.js';
import { createOrder } from './duck/thunks.js';
import { selectCompanyActiveAddresses, selectCompanyPorts } from '../home/duck/selectors.js';
import { selectClientsMap } from '../clients/duck/selectors.js';
import RHFOrderDetails from '../shared/rhf/forms/RHFOrderDetails.js';
import Footer from '../shared/components/Footer.js';
import RHFProductTable from '../shared/rhf/forms/RHFProductTable.js';
import { selectActiveProducts } from '../products/duck/selectors.js';
import { validateItems } from '../shared/rhf/forms/util/helpers.js';

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

const {
    titleLabel,
    stepLabelsMap,
    prevButtonLabel,
    nextButtonLabel
} = LANGUAGE.order.createOrder;

const orderDetailsFieldNames = {
    ref: 'ref',
    date: 'date',
    fromAdd: 'fromAdd',
    to: 'to',
    toAdd: 'toAdd',
    crd: 'crd',
    incoterm: 'incoterm',
    pay: 'pay',
    clientRef: 'clientRef',
    notes: 'notes',
    shipAdd: 'shipAdd',
    del: 'del',
    pol: 'pol',
    pod: 'pod',
    carrier: 'carrier',
    autoGenerateRef: 'autoGenerateRef'
};

const productTableFieldNames = {
    custom1: 'custom1',
    custom2: 'custom2',
    currency: 'currency',
    items: 'items',
    quantity: 'totalQ',
    total: 'totalA',
    saveItems: 'saveItems'
};

export default function CreateOrder() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { step } = useParams();
    const newOrder = useSelector(selectNewOrder);
    const companyAddresses = useSelector(selectCompanyActiveAddresses);
    const companyPorts = useSelector(selectCompanyPorts);
    const clientsMap = useSelector(selectClientsMap);
    const products = useSelector(selectActiveProducts);
    const [order, setOrder] = useSessionStorage(SESSION_NEW_ORDER, newOrder);

    const rhfMethods = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [orderDetailsFieldNames.ref]: !order.autoGenerateRef ? order.ref : null,
            from: order.from,
            [orderDetailsFieldNames.fromAdd]: order.fromAdd,
            [orderDetailsFieldNames.to]: order.to || null,
            [orderDetailsFieldNames.toAdd]: order.toAdd || null,
            [orderDetailsFieldNames.date]: new Date(order.date),
            [orderDetailsFieldNames.crd]: order.crd ? new Date(order.crd) : null,
            [orderDetailsFieldNames.incoterm]: order.incoterm || null,
            [orderDetailsFieldNames.pay]: order.pay,
            [orderDetailsFieldNames.clientRef]: order.clientRef,
            [orderDetailsFieldNames.notes]: order.notes,
            [orderDetailsFieldNames.shipAdd]: order.shipAdd || null,
            [orderDetailsFieldNames.pol]: order.pol || null,
            [orderDetailsFieldNames.pod]: order.pod || null,
            [orderDetailsFieldNames.del]: order.del,
            [orderDetailsFieldNames.carrier]: order.carrier,
            [productTableFieldNames.currency]: order.currency,
            [productTableFieldNames.items]: order.items,
            [productTableFieldNames.custom1]: order.custom1,
            [productTableFieldNames.custom2]: order.custom2,
            [productTableFieldNames.quantity]: order.totalQ,
            [productTableFieldNames.total]: order.totalA,
            [productTableFieldNames.saveItems]: order.saveItems,
            [orderDetailsFieldNames.autoGenerateRef]: order.autoGenerateRef,
            createdBy: order.createdBy
        }
    });
    const { register, control, errors, clearErrors, setValue, getValues, handleSubmit } = rhfMethods;

    useEffect(() => {
        register({ name: productTableFieldNames.items }, { validate: validateItems });
        register({ name: productTableFieldNames.custom1 });
        register({ name: productTableFieldNames.custom2 });
        register({ name: productTableFieldNames.quantity });
        register({ name: productTableFieldNames.total });
    }, [register]);

    const errMessages = Object.values(errors).map(err => err.message);

    const onPrevClick = () => {
        if (step === 'details') {
            dispatch(cleanNewOrder());
            history.goBack();
        } else if (step === 'products') {
            clearErrors();
            setOrder(getValues());
            history.push('/home/orders/new/details');
        }
    };

    const onNextClick = () => {
        if (step === 'details') {
            setOrder(getValues());
            history.push('/home/orders/new/products');
        } else if (step === 'products') {
            handleSubmit(onSubmit)();
        }
    };

    const onSubmit = (data) => {
        data.to = data.to._id;
        dispatch(createOrder(data));
    };

    return (
        <Box>
            { getCurrentStep(step) === -1 && <Redirect to={ '/home/orders' }/> }
            <DocumentStepper activeStep={ getCurrentStep(step) } steps={ Object.values(stepLabelsMap) }/>
            <Typography variant="h5">{ titleLabel }</Typography>
            <Divider/>
            <Paper>
                { errMessages.length > 0 && <ErrorDisplay errors={ errMessages }/> }
                <Box hidden={ step !== 'details' }>
                    <RHFOrderDetails
                        rhfRegister={ register }
                        rhfErrors={ errors }
                        rhfControl={ control }
                        rhfGetValues={ getValues }
                        rhfSetValue={ setValue }
                        companyAddresses={ companyAddresses }
                        companyPorts={ companyPorts }
                        clientsMap={ clientsMap }
                        fieldNames={ orderDetailsFieldNames }
                    />
                </Box>
                <Box hidden={ step !== 'products' }>
                    <RHFProductTable
                        rhfErrors={ errors }
                        rhfControl={ control }
                        rhfSetValue={ setValue }
                        rhfGetValues={ getValues }
                        fieldNames={ productTableFieldNames }
                        products={ products }
                    />
                </Box>
            </Paper>
            <Footer
                prevLabel={ step === 'details' ? prevButtonLabel.details : prevButtonLabel.products }
                nextLabel={ step === 'details' ? nextButtonLabel.details : nextButtonLabel.products }
                onPrevClick={ onPrevClick }
                onNextClick={ onNextClick }
            />
        </Box>
    )
}