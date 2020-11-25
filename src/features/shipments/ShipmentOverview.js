import React from 'react';
import { useHistory } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useDispatch } from 'react-redux';
import { cleanNewShipment } from './duck/slice.js';
import ShipmentsTable from './ShipmentsTable.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    shipmentOverviewRoot: {
        margin: theme.spacing(2),
    },
    newShipmentButton: {
        margin: theme.spacing(2),
    }
}));

const { newShipmentButtonLabel } = LANGUAGE.shipment.overview;

export default function ShipmentOverview() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const onNewOrderClick = () => {
        dispatch(cleanNewShipment());
        history.push('/home/shipments/new');
    }

    return (
        <Paper className={ classes.shipmentOverviewRoot }>
            <ThemedButton
                onClick={ onNewOrderClick }
                className={ classes.newShipmentButton }
            >
                { newShipmentButtonLabel }
            </ThemedButton>
            <ShipmentsTable/>
        </Paper>
    )
}

