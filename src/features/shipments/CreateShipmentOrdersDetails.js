import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../constants.js';

const useStyles = makeStyles((theme) => ({
    label: {
        fontWeight: 'bold',
        color: theme.palette.tertiary['600']
    },
    value: {

    }
}));

const { detailsTitleLabel } = LANGUAGE.shipments.createShipmentOrders;

export default function CreateShipmentOrdersDetails() {
    const classes = useStyles();

    const DetailRow = (label, value) =>
        <Grid container justify="flex-start" alignItems="center" item xs={12}>
            <Typography variant="subtitle1" className={ classes.label }>{label}</Typography>
            <Typography variant="subtitle1" className={ classes.value }>{value}</Typography>
        </Grid>

    return (
        <Grid>
            <Typography variant="h5">{detailsTitleLabel}</Typography>
            <Divider />
            <DetailRow />
        </Grid>
    )
}