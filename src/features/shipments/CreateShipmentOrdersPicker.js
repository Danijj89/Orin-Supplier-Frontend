import React, { useState } from 'react';
import { Paper, Box, Chip, Divider, List, Typography, TextField } from '@material-ui/core';
import CreateShipmentOrdersListItem from './CreateShipmentOrdersListItem.js';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { selectAutocompleteOptions } from './duck/selectors.js';
import { LANGUAGE } from '../../app/constants.js';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
    paper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center'
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
    chipContainer: {
        minHeight: 180
    },
    chip: {
        margin: theme.spacing(0.5),
        backgroundColor: theme.palette.tertiary['300'],
        color: theme.palette.tertiary['600'],
        minWidth: 80
    },
    clientsDropdown: {
        margin: theme.spacing(2)
    },
    list: {
        overflow: 'scroll',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: theme.palette.tertiary['300'],
        borderRadius: 4,
        margin: theme.spacing(2),
        flex: '1 1 auto',
    }
}));

const { chipTitleLabel, clientDropdownLabel } = LANGUAGE.shipments.createShipmentOrders;

export default function CreateShipmentOrdersPicker({ setValue, watch, setSelectedOrder }) {
    const classes = useStyles();
    const { clients, clientOrderMap } = useSelector(selectAutocompleteOptions);
    const [orderOptions, setOrderOptions] = useState([]);
    const [client, setClient] = useState(null);
    const orders = watch('orders');

    const onAddOrder = (order) => {
        setValue('orders', [...orders, order]);
        setOrderOptions(prevOrders => prevOrders.filter(o => o.poRef !== order.poRef));
    }

    const onDeleteOrderChip = (order) => {
        setValue('orders', orders.filter(o => o.poRef !== order.poRef));
        setOrderOptions(prevOrders => [...prevOrders, order]);
    }

    const onClientChange = (newClient) => {
        if (client) setValue('orders', []);
        setClient(newClient);
        setOrderOptions(clientOrderMap[newClient]);
    }

    return (
        <Paper className={ classes.paper }>
            <Typography variant="h5" className={ classes.title }>
                { chipTitleLabel }
            </Typography>
            <Divider/>
            <Box item xs={ 12 } className={ classes.chipContainer }>
                { orders.map((order, index) =>
                    <Chip
                        key={ index }
                        label={ order.poRef }
                        onDelete={ () => onDeleteOrderChip(order) }
                        className={ classes.chip }
                        onClick={ () => setSelectedOrder(order) }
                    />
                ) }
            </Box>
            <Autocomplete
                options={ clients }
                renderInput={ (params) => (
                    <TextField
                        { ...params }
                        label={ clientDropdownLabel }
                        variant="outlined"
                        size="small"
                    />
                ) }
                onChange={ (_, data) => onClientChange(data) }
                className={ classes.clientsDropdown }
            />
            <List className={ classes.list }>
                { orderOptions.map((order, index) =>
                    <CreateShipmentOrdersListItem
                        key={ index }
                        poRef={ order.poRef }
                        onAdd={ () => onAddOrder(order) }
                        onClick={ () => setSelectedOrder(order) }
                    />
                ) }
            </List>
        </Paper>

    )
}