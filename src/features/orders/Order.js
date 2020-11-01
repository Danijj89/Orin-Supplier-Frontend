import React, { useEffect, useRef, useState } from 'react';
import { Paper, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGE } from '../../app/constants.js';
import OrderDetails from './OrderDetails.js';
import { fetchOrderById } from './duck/thunks.js';
import { selectUserStatus } from '../users/duck/selectors.js';
import { selectOrderById, selectOrderStatus } from './duck/selectors.js';
import { determineStatus } from '../shared/utils/state.js';
import Loader from '../shared/components/Loader.js';
import { selectCurrentCompany, selectHomeStatus } from '../home/duck/selectors.js';
import { selectClientDataStatus } from '../clients/duck/selectors.js';
import { fetchClients } from '../clients/duck/thunks.js';
import { selectProductStatus } from '../products/duck/selectors.js';
import { fetchProducts } from '../products/duck/thunks.js';
import { Redirect } from 'react-router-dom';
import OrderDocuments from './OrderDocuments.js';
import { makeStyles } from '@material-ui/core/styles';
import NavTabs from '../shared/components/NavTabs.js';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            paddingLeft: theme.spacing(25),
            paddingRight: theme.spacing(25),
        },
    },
    orderTabs: {
        marginBottom: theme.spacing(1)
    }
}));

const { tabsLabelsMap } = LANGUAGE.order.order;

export default function Order({ match }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = match.params;
    const order = useSelector(state => selectOrderById(state, id));
    const company = useSelector(selectCurrentCompany);
    const userStatus = useSelector(selectUserStatus);
    const orderStatus = useSelector(selectOrderStatus);
    const homeStatus = useSelector(selectHomeStatus);
    const clientDataStatus = useSelector(selectClientDataStatus);
    const productStatus = useSelector(selectProductStatus);
    const shouldCheckOrderStatus = Boolean(!order);
    const status = determineStatus([
        userStatus,
        shouldCheckOrderStatus && orderStatus,
        homeStatus,
        clientDataStatus,
        productStatus
    ]);
    const [tabValue, setTabValue] = useState('details');

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {
            if (!order) dispatch(fetchOrderById(id));
            if (clientDataStatus === 'IDLE' && company) dispatch(fetchClients(company._id));
            if (productStatus === 'IDLE' && company) dispatch(fetchProducts(company._id));
        }
        if (status === 'FULFILLED') mounted.current = true;
    }, [dispatch, order, id, company, status, clientDataStatus, productStatus]);

    return (
        <Box className={ classes.root }>
            { status === 'PENDING' && <Loader/> }
            { order?.active === false && <Redirect to={ '/home/orders' }/> }
            <Paper>
                <NavTabs
                    tabsLabelsMap={ tabsLabelsMap }
                    tabValue={ tabValue }
                    onChange={ setTabValue }
                    className={ classes.orderTabs }
                />
            </Paper>
            { status === 'FULFILLED' && tabValue === 'details' &&
            <OrderDetails order={ order }/>
            }
            { status === 'FULFILLED' && tabValue === 'documents' && <OrderDocuments order={ order }/> }
        </Box>
    )
}

