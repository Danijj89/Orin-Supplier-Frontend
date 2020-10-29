import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';

const { newShipmentButtonLabel } = LANGUAGE.shipments.overview;

export default function ShipmentOverview() {
    const history = useHistory();

    const onNewOrderClick = () => history.push('/home/shipments/new');

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

