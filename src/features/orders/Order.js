import React, { useEffect, useState } from 'react';
import OrderInfoTile from './OrderInfoTile.js';
import { Grid, Tabs, Tab } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import OrderDocuments from './OrderDocuments.js';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import OrderStatusInfoTile from './OrderStatusInfoTile.js';
import { selectOrderById } from './duck/slice.js';
import OrderProductTable from './OrderProductTable.js';
import { fetchOrderOptions } from './duck/thunks.js';

const { orderDetailsTab, documentsTab } = LANGUAGE.order.order;

const useStyles = makeStyles((theme) => ({
    container: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    details: {
        padding: theme.spacing(2)
    }
}));

export default function Order({ match }) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { id, page } = match.params;
    const order = useSelector(state => selectOrderById(state, id));
    const initialPage = page === 0 || page === 1 ? page : 0;
    const [tabValue, setTabValue] = useState(initialPage);

    useEffect(() => {
        dispatch(fetchOrderOptions());
    }, [dispatch]);

    const onTabChange = (event, newValue) => {
        setTabValue(newValue);
        history.push(`/home/orders/${ id }/${ newValue }`);
    };

    return (
        <Grid container className={ classes.container }>
            <Grid item xs={ 6 }>
                { order && <OrderInfoTile order={ order }/> }
            </Grid>
            <Grid item xs={ 6 }>
                { order && <OrderStatusInfoTile order={ order }/> }
            </Grid>
            <Grid item xs={ 12 }>
                <Tabs
                    value={ tabValue }
                    onChange={ onTabChange }
                    indicatorColor='primary'
                    textColor='primary'
                    className={ classes.details }
                >
                    <Tab label={ orderDetailsTab } component="span"/>
                    <Tab label={ documentsTab } component="span"/>
                </Tabs>
                { order && tabValue === 0 && <OrderProductTable order={order}/> }
                {/*{ tabValue === 1 && <OrderDocuments order={ order }/> }*/}
            </Grid>
        </Grid>
    )
}