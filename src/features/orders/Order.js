import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Paper, Box } from '@material-ui/core';
import { LANGUAGE } from '../../app/utils/constants.js';
import OrderDetails from './OrderDetails.js';
import OrderDocuments from './OrderDocuments.js';
import { makeStyles } from '@material-ui/core/styles';
import NavTabs from '../shared/components/NavTabs.js';
import queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            paddingLeft: theme.spacing(10),
            paddingRight: theme.spacing(10),
        },
    },
    orderTabs: {
        marginBottom: theme.spacing(1)
    }
}));

const { tabsLabelsMap } = LANGUAGE.order.order;

const Order = React.memo(function Order() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { tab } = queryString.parse(location.search);
    const tabValue = tab || 'details';

    const setTabValue = (newValue) =>
        history.push(`${location.pathname}?tab=${newValue}`);

    return (
        <Box className={ classes.root }>
            <Paper>
                <NavTabs
                    tabsLabelsMap={ tabsLabelsMap }
                    tabValue={ tabValue }
                    onChange={ setTabValue }
                    className={ classes.orderTabs }
                />
            </Paper>
            { tabValue === 'details' && <OrderDetails /> }
            { tabValue === 'documents' && <OrderDocuments/> }
        </Box>
    )
});

export default Order;

