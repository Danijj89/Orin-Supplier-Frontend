import React from 'react';
import { Paper, Box, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../constants.js';

const useStyles = makeStyles((theme) => ({
    paper: {
        height: '100%'
    },
    row: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        fontWeight: 'bold',
        color: theme.palette.tertiary['600'],
        height: 48
    },
    bottomPanel: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    label: {
        fontWeight: 'bold',
        color: theme.palette.tertiary['600'],
        marginRight: theme.spacing(4)
    }
}));

const { detailsTitleLabel, orderRefLabel } = LANGUAGE.shipments.createShipmentOrders;

export default function CreateShipmentOrdersDetails({ selectedOrder }) {
    const classes = useStyles();

    const DetailRow = ({ label, value }) =>
        <Box className={ classes.row }>
            <Typography variant="subtitle1" className={ classes.label }>{ label }</Typography>
            <Typography variant="subtitle1" >{ value }</Typography>
        </Box>

    return (
        <Paper className={ classes.paper }>
            <Typography variant="h5" className={ classes.title }>{ detailsTitleLabel }</Typography>
            <Divider/>
            { selectedOrder &&
            <Box className={ classes.bottomPanel }>
                <DetailRow label={ orderRefLabel } value={ selectedOrder.poRef }/>
            </Box>
            }
        </Paper>
    )
}