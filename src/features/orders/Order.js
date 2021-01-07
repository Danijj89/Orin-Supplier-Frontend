import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Box } from '@material-ui/core';
import OrderDetails from './OrderDetails.js';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import ShippingPlan from 'features/orders/ShippingPlan.js';
import { useSelector } from 'react-redux';
import { selectOrderById } from 'features/orders/duck/selectors.js';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            paddingLeft: theme.spacing(10),
            paddingRight: theme.spacing(10),
        },
    }
}));

const Order = React.memo(function Order() {
    const classes = useStyles();

    const location = useLocation();
    const { id: orderId } = useParams();
    const { mode = 'view' } = queryString.parse(location.search);
    const order = useSelector(state => selectOrderById(state, { orderId }));

    return (
        <Box className={ classes.root }>
            { mode === 'view' &&
            <OrderDetails order={ order }/>
            }
            { mode === 'edit' && <ShippingPlan orderId={ orderId }/> }
        </Box>
    )
});

export default Order;

