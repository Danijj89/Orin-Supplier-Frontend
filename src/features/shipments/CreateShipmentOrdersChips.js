import React from 'react';
import { Box, Chip, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../constants.js';

const useStyles = makeStyles((theme) => ({
    box: {
        margin: theme.spacing(1),
        minHeight: 180
    },
    chip: {
        margin: theme.spacing(0.5),
        backgroundColor: theme.palette.tertiary['300'],
        color: theme.palette.tertiary['600'],
        minWidth: 80
    },
    title: {
        fontWeight: 'bold',
        color: theme.palette.tertiary['600']
    }
}));

const { chipTitleLabel } = LANGUAGE.shipments.createShipmentOrders;

export default function CreateShipmentOrdersChips ({ ordersRef, onDeleteClick }) {
    const classes = useStyles();

    return (
        <Box className={ classes.box }>
            <Typography variant="h6" className={ classes.title }>
                {chipTitleLabel}
            </Typography>
            <Divider />
            {ordersRef.map((orderRef, index) =>
                <Chip
                    key={index}
                    label={orderRef}
                    onDelete={() => onDeleteClick(orderRef)}
                    className={ classes.chip }
                />
            )}
        </Box>
    )
}