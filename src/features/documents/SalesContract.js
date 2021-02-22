import React, { useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { selectPopulatedShipmentById } from '../shipments/duck/selectors.js';
import { shipmentToSalesContract } from '../shared/utils/entityConversion.js';
import useLocalStorage from 'features/shared/hooks/useLocalStorage.js';
import { SESSION_NEW_DOCUMENT } from 'app/sessionKeys.js';
import SalesContractDetails from './SalesContractDetails.js';
import SalesContractProducts from './SalesContractProducts.js';

const SalesContract = React.memo(function SalesContract() {
    const location = useLocation();
    const { shipment: shipmentId, step, document: documentId } = queryString.parse(location.search);
    const shipment = useSelector(state => selectPopulatedShipmentById(state, { shipmentId }));
    const initialSC = shipmentToSalesContract(shipment, documentId);
    const [salesContract, setSalesContract] = useLocalStorage(SESSION_NEW_DOCUMENT, initialSC);

    const isEdit = useMemo(() => Boolean(documentId), [documentId]);

    return (
        <Paper>
            { step === 'details' &&
            <SalesContractDetails
                salesContract={ salesContract }
                setSalesContract={ setSalesContract }
                shipmentId={ shipmentId }
                documentId={ documentId }
                isEdit={ isEdit }
            />
            }
            { step === 'products' &&
            <SalesContractProducts
                salesContract={ salesContract }
                setSalesContract={ setSalesContract }
                shipmentId={ shipmentId }
                documentId={ documentId }
                isEdit={ isEdit }
            />
            }
        </Paper>
    )
});

export default SalesContract;