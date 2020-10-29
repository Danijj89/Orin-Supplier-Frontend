import React from 'react';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch } from 'react-redux';

const { newShipmentButtonLabel } = LANGUAGE.shipments.overview;

export default function ShipmentOverview() {
    const dispatch = useDispatch();

    const onNewOrderClick = () =>

    return (
        <Box>
            <ThemedButton>
                { newShipmentButtonLabel }
            </ThemedButton>
        </Box>
    )
}