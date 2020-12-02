import React from 'react';
import Paper from '@material-ui/core/Paper';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { selectPopulatedShipmentById } from '../shipments/duck/selectors.js';
import { shipmentToSalesContract } from '../shared/utils/entityConversion.js';
import useSessionStorage from '../shared/hooks/useSessionStorage.js';
import { SESSION_NEW_DOCUMENT } from '../../app/sessionKeys.js';
import SalesContractDetails from './SalesContractDetails.js';
import SalesContractProducts from './SalesContractProducts.js';

const SalesContract = React.memo(function SalesContract() {
    const location = useLocation();
    const { shipment: shipmentId, step } = queryString.parse(location.search);
    const shipment = useSelector(state => selectPopulatedShipmentById(state, { shipmentId }));
    const initialSC = shipmentToSalesContract(shipment);
    const [salesContract, setSalesContract] = useSessionStorage(SESSION_NEW_DOCUMENT, initialSC);

    return (
        <Paper>
            { step === 'details' &&
            <SalesContractDetails
                salesContract={ salesContract }
                setSalesContract={ setSalesContract }
                shipmentId={ shipmentId }
            />
            }
            { step === 'products' &&
            <SalesContractProducts
                salesContract={ salesContract }
                setSalesContract={ setSalesContract }
                shipmentId={ shipmentId }
            />
            }
        </Paper>
    )
});

export default SalesContract;