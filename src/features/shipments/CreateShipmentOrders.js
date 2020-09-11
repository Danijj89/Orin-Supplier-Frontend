import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import CreateShipmentOrdersPicker from './CreateShipmentOrdersPicker.js';
import CreateShipmentOrdersDetails from './CreateShipmentOrdersDetails.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../constants.js';

const useStyles = makeStyles((theme) => ({
    row: {
        minHeight: 600,
        margin: theme.spacing(2)
    },
    buttonsRow: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: theme.spacing(1)
    },
    column: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        height: '100%'
    },
    button: {
        minWidth: 200
    }
}));

const { cancelButton, nextButton } = LANGUAGE.shipments.createShipmentOrders;

export default function CreateShipmentOrders({ setActiveStep }) {
    const classes = useStyles();
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { register, setValue, watch } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            orders: []
        }
    });

    const validateOrders = (orders) => true

    useEffect(() => {
        register({ name: 'orders' }, { validate: validateOrders })
    }, [register]);

    return (
        <Grid container>
            <Grid container item xs={ 12 } className={ classes.row }>
                <Grid item xs={ 4 } className={ classes.column }>
                    <CreateShipmentOrdersPicker
                        setValue={ setValue }
                        watch={ watch }
                        setSelectedOrder={ setSelectedOrder }
                    />
                </Grid>
                <Grid item xs={ 8 } className={ classes.column }>
                    <CreateShipmentOrdersDetails selectedOrder={ selectedOrder }/>
                </Grid>
            </Grid>
            <Grid className={ classes.buttonsRow } item xs={ 12 }>
                <ThemedButton text={ cancelButton } variant="outlined" styles={ classes.button }/>
                <ThemedButton text={ nextButton } styles={ classes.button }/>
            </Grid>
        </Grid>
    )
}