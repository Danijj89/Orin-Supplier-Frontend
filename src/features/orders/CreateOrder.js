import React, { useMemo } from 'react';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Box, Paper, Divider, Typography } from '@material-ui/core';
import { Redirect, useLocation } from 'react-router-dom';
import { LANGUAGE } from '../../app/utils/constants.js';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import CreateOrderDetails from './CreateOrderDetails.js';
import CreateOrderProducts from './CreateOrderProducts.js';
import useSessionStorage from '../shared/hooks/useSessionStorage.js';
import { SESSION_NEW_ORDER } from '../../app/sessionKeys.js';
import { useSelector } from 'react-redux';
import { selectCompanyDefaultAddress, selectCurrentCompany } from '../home/duck/selectors.js';
import { deliveryMethodOptions, itemUnitsOptions } from '../shared/constants.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import { defaultProductRowValues } from '../shared/rhf/forms/util/constants.js';

const useStyles = makeStyles((theme) => ({
    orderRoot: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(0),
    },
    newOrderLabel: {
        marginTop: '-10px',
        marginBottom: theme.spacing(1),
    },
}));

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
    stepLabelsMap
} = LANGUAGE.order.createOrder;

const CreateOrder = React.memo(function CreateOrder() {
    const classes = useStyles();
    const location = useLocation();
    const { step } = queryString.parse(location.search);
    const company = useSelector(selectCurrentCompany);
    const companyDefaultAddress = useSelector(selectCompanyDefaultAddress);
    const userId = useSelector(selectCurrentUserId);

    const newOrder = useMemo(() => ({
        from: company._id,
        fromAdd: companyDefaultAddress,
        date: Date.now(),
        del: deliveryMethodOptions[0],
        currency: company.currency || null,
        totalQ: { [itemUnitsOptions[0]]: 0 },
        totalA: 0,
        createdBy: userId,
        saveItems: false,
        autoGenerateRef: false,
        items: [defaultProductRowValues]
    }), [company._id, company.currency, companyDefaultAddress, userId]);

    const [order, setOrder] = useSessionStorage(SESSION_NEW_ORDER, newOrder);

    return (
        <Box className={ classes.orderRoot }>
            { getCurrentStep(step) === -1 && <Redirect to={ '/home/orders' }/> }
            <DocumentStepper activeStep={ getCurrentStep(step) } steps={ Object.values(stepLabelsMap) }/>
            <Typography className={ classes.newOrderLabel } variant="h5">{ titleLabel }</Typography>
            <Divider/>
            <Paper>
                { step === 'details' && <CreateOrderDetails order={ order } setOrder={ setOrder }/> }
                { step === 'products' && <CreateOrderProducts order={ order } setOrder={ setOrder }/> }
            </Paper>
        </Box>
    )
});

export default CreateOrder;