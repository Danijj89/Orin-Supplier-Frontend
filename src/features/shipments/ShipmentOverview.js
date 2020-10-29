import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch } from 'react-redux';
import { cleanNewShipment } from './duck/slice.js';

const { newShipmentButtonLabel } = LANGUAGE.shipments.overview;

export default function ShipmentOverview() {
    const dispatch = useDispatch();
    const history = useHistory();

    const onNewOrderClick = () => {
        dispatch(cleanNewShipment());
        history.push('/home/shipments/new');
    };

    return (
        <Box>
            <ThemedButton
                onClick={ onNewOrderClick }
            >
                { newShipmentButtonLabel }
            </ThemedButton>
        </Box>
    )
}

