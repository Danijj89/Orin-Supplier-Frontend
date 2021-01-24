import React from 'react';
import { useLocation } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import CommercialInvoiceDetails from './CommercialInvoiceDetails.js';
import { useSelector } from 'react-redux';
import useSessionStorage from '../shared/hooks/useSessionStorage.js';
import { SESSION_NEW_DOCUMENT } from 'app/sessionKeys.js';
import {
    shipmentToCommercialInvoice
} from '../shared/utils/entityConversion.js';
import queryString from 'query-string';
import { selectPopulatedShipmentById } from '../shipments/duck/selectors.js';
import CommercialInvoiceProducts from './CommercialInvoiceProducts.js';

const CommercialInvoice = React.memo(function CommercialInvoice() {
    const location = useLocation();
    const { shipment: shipmentId, step } = queryString.parse(location.search);
    const shipment = useSelector(state => selectPopulatedShipmentById(state, { shipmentId }));
    const initialCI = shipmentToCommercialInvoice(shipment);
    const [commercialInvoice, setCommercialInvoice] = useSessionStorage(SESSION_NEW_DOCUMENT, initialCI);

    return (
        <Paper>
            { step === 'details' &&
            <CommercialInvoiceDetails
                commercialInvoice={ commercialInvoice }
                setCommercialInvoice={ setCommercialInvoice }
                shipmentId={ shipmentId }
            /> }
            { step === 'products' &&
            <CommercialInvoiceProducts
                commercialInvoice={ commercialInvoice }
                setCommercialInvoice={ setCommercialInvoice }
                shipmentId={ shipmentId }
            /> }
        </Paper>
    )
});

export default CommercialInvoice;