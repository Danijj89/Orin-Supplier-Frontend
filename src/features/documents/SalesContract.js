import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { selectShipmentById } from '../shipments/duck/selectors.js';
import { shipmentToSalesContract } from '../shared/utils/entityConversion.js';
import useSessionStorage from '../shared/hooks/useSessionStorage.js';
import { SESSION_NEW_DOCUMENT } from '../../app/sessionKeys.js';

const SalesContract = React.memo(function SalesContract() {

    const location = useLocation();
    const { shipment: shipmentId } = queryString.parse(location.search);
    const shipment = useSelector(state => selectShipmentById(state, shipmentId));
    const [step, setStep] = useState('details');
    const initialSC = shipmentToSalesContract(shipment);
    const [salesContract, setSalesContract] = useSessionStorage(SESSION_NEW_DOCUMENT, initialSC);

    return (
        <Paper>

        </Paper>
    )
});

export default SalesContract;