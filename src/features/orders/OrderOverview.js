import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { LANGUAGE } from 'app/utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { cleanNewOrder } from './duck/slice.js';
import { Paper } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import OrdersTable from './OrdersTable.js';
import { makeStyles } from '@material-ui/core/styles';
import { CREATE_ANY, CREATE_OWN } from '../admin/utils/actions.js';
import OrderPermission from '../shared/permissions/OrderPermission.js';
import SearchBar from 'features/shared/components/SearchBar.js';
import { selectAllActiveOrders } from 'features/orders/duck/selectors.js';
import { getOrderURL } from 'features/orders/utils/urls.js';
import Box from '@material-ui/core/Box';
import { selectClientsMap } from 'features/clients/duck/selectors.js';

const { newOrderButtonLabel } = LANGUAGE.order.ordersOverview;

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(2),
    },
    topRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(2)
    },
    button: {
        marginRight: theme.spacing(1)
    }
}));

const OrderOverview = React.memo(function OrderOverview() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const orders = useSelector(selectAllActiveOrders);
    const clients = useSelector(selectClientsMap);

    const onNewOrderClick = () => {
        dispatch(cleanNewOrder());
        history.push('/home/orders/new?step=details');
    };

    const getUrl = useCallback(order => getOrderURL(order._id), []);

    const getOptionLabel = useCallback(
        order => `${ order.ref } - ${ clients[order.to]?.name }`,
        [clients]);

    return (
        <Paper className={ classes.container }>
            <Box className={ classes.topRow }>
                <OrderPermission action={ [CREATE_ANY, CREATE_OWN] }>
                    <ThemedButton onClick={ onNewOrderClick } className={classes.button}>
                        { newOrderButtonLabel }
                    </ThemedButton>
                </OrderPermission>
                <SearchBar
                    options={ orders }
                    getOptionLabel={ getOptionLabel }
                    getOptionSelected={ (order, value) => order._id === value._id }
                    getUrl={ getUrl }
                />
            </Box>
            <OrdersTable/>
        </Paper>
    );
});

export default OrderOverview;
