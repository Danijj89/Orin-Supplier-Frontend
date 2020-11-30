import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { selectShipmentById } from '../shipments/duck/selectors.js';
import { shipmentToChinaExport } from '../shared/utils/entityConversion.js';

const ChinaExport = React.memo(function ChinaExport() {
    const location = useLocation();
    const { shipment: shipmentId, step } = queryString.parse(location.search);
    const shipment = useSelector(state => selectShipmentById(state, shipmentId));
    const initialCE = shipmentToChinaExport(shipment);

    return (
        <Paper>

        </Paper>
    )
});

export default ChinaExport;