import React from 'react';
import Paper from '@material-ui/core/Paper';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { selectShipmentById } from '../shipments/duck/selectors.js';
import Box from '@material-ui/core/Box';
import DocumentStepper from '../shared/DocumentStepper.js';

const PackingList = React.memo(function PackingList() {

    const location = useLocation();
    const { shipment: shipmentId, step } = queryString.parse(location.search);
    const shipment = useSelector(state => selectShipmentById(state, shipmentId));

    return (
        <Box>

        </Box>
    )
});

export default PackingList;