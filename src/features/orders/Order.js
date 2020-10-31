import React, { useEffect, useRef, useState } from 'react';
import { Paper, Box, Tabs, Tab } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGE } from '../../app/constants.js';
import OrderDetails from './OrderDetails.js';
import { fetchOrderById } from './duck/thunks.js';
import { selectUserStatus } from '../users/duck/selectors.js';
import { selectOrderById, selectOrderStatus } from './duck/selectors.js';
import { isLoading } from '../shared/utils/store.js';
import Loader from '../shared/components/Loader.js';
import { selectCurrentCompany, selectHomeStatus } from '../home/duck/selectors.js';
import { selectClientStatus } from '../clients/duck/selectors.js';
import { fetchClients } from '../clients/duck/thunks.js';
import { selectProductStatus } from '../products/duck/selectors.js';
import { fetchProducts } from '../products/duck/thunks.js';
import { Redirect } from 'react-router-dom';
import OrderDocuments from './OrderDocuments.js';
import { makeStyles } from '@material-ui/core/styles';

const { tabsLabelsMap } = LANGUAGE.order.order;

export default function Order({ match }) {
    const dispatch = useDispatch();
    const { id } = match.params;
    const order = useSelector(state => selectOrderById(state, id));
    const company = useSelector(selectCurrentCompany);
    const userStatus = useSelector(selectUserStatus);
    const orderStatus = useSelector(selectOrderStatus);
    const homeStatus = useSelector(selectHomeStatus);
    const clientStatus = useSelector(selectClientStatus);
    const productStatus = useSelector(selectProductStatus);
    const loading = isLoading([userStatus, orderStatus, homeStatus, clientStatus, productStatus]);
    const [tabValue, setTabValue] = useState('details');

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

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current && !order) dispatch(fetchOrderById(id));
        if (!mounted.current) {
            if (clientStatus === 'IDLE' && company) dispatch(fetchClients(company._id));
            if (productStatus === 'IDLE' && company) dispatch(fetchProducts(company._id));
        }
        if (clientStatus === 'FULFILLED' && productStatus === 'FULFILLED') mounted.current = true;
    }, [dispatch, order, id, clientStatus, company, productStatus]);

    const classes = useStyles();
    const onTabChange = (event, newValue) => setTabValue(newValue);

    return (
        <Box className={classes.root}>
            { loading && <Loader/> }
            { order?.active === false && <Redirect to={ '/home/orders' }/> }
            <Paper>
                <Tabs
                    value={ tabValue }
                    onChange={ onTabChange }
                    indicatorColor='primary'
                    textColor='primary'
                    className={classes.orderTabs}
                >
                    { Object.entries(tabsLabelsMap).map(([value, label]) =>
                        <Tab key={ value } label={ label } value={ value } component="span"/>
                    ) }
                </Tabs>
            </Paper>
            { order && company && clientStatus === 'FULFILLED' && productStatus === 'FULFILLED'
            && tabValue === 'details' &&
            <OrderDetails order={ order }/>
            }
            { order && tabValue === 'documents' && <OrderDocuments order={ order }/> }
        </Box>
    )
}

