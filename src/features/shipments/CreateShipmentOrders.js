import React, { useEffect } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import CreateShipmentOrdersList from './CreateShipmentOrdersList.js';
import CreateShipmentOrdersChips from './CreateShipmentOrdersChips.js';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(2)
    },
    column: {
        maxHeight: 600
    },
    paper: {
        padding: theme.spacing(1),
        margin: theme.spacing(2),
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    }
}));

export default function CreateShipmentOrders() {
    const classes = useStyles();

    const { register, setValue, watch } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            ordersRef: []
        }
    });

    const validateOrders = (orders) => true

    useEffect(() => {
        register({ name: 'ordersRef' }, { validate: validateOrders })
    }, [register]);

    const ordersRef = watch('ordersRef');

    return (

        <form>
            <Grid container className={ classes.container }>
                <Grid item xs={ 4 } className={ classes.column }>
                    <Paper className={ classes.paper }>
                        <CreateShipmentOrdersChips ordersRef={ ordersRef }/>
                        <CreateShipmentOrdersList setValue={ setValue } ordersRef={ ordersRef }/>
                    </Paper>
                </Grid>
                <Grid item xs={ 8 } className={ classes.column }>
                    <Paper className={ classes.paper }>
                    </Paper>
                </Grid>
            </Grid>
        </form>

    )
}