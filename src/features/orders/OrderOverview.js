import React from 'react';
import { useHistory } from 'react-router-dom';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useDispatch } from 'react-redux';
import { cleanNewOrder } from './duck/slice.js';
import { Paper } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import OrdersTable from './OrdersTable.js';
import { makeStyles } from '@material-ui/core/styles';
import { CREATE_ANY, CREATE_OWN } from '../admin/utils/actions.js';
import OrderPermission from '../shared/permissions/OrderPermission.js';

const { newOrderButtonLabel } = LANGUAGE.order.ordersOverview;

const useStyles = makeStyles((theme) => ({
    orderOverviewRoot: {
        margin: theme.spacing(2),
    },
    newOrder: {
        margin: theme.spacing(2),
    },
}));

const OrderOverview = React.memo(function OrderOverview() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const onNewOrderClick = () => {
        dispatch(cleanNewOrder());
        history.push('/home/orders/new?step=details');
    };

    return (
        <Paper className={ classes.orderOverviewRoot }>
            <OrderPermission action={ [CREATE_ANY, CREATE_OWN] }>
                <ThemedButton
                    className={ classes.newOrder }
                    onClick={ onNewOrderClick }
                >
                    { newOrderButtonLabel }
                </ThemedButton>
            </OrderPermission>
            <OrdersTable/>
        </Paper>
    );
});

export default OrderOverview;
