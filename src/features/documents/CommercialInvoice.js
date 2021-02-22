import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import CommercialInvoiceDetails from './CommercialInvoiceDetails.js';
import { useSelector } from 'react-redux';
import useLocalStorage from 'features/shared/hooks/useLocalStorage.js';
import { SESSION_NEW_DOCUMENT } from 'app/sessionKeys.js';
import {
    shipmentToCommercialInvoice
} from '../shared/utils/entityConversion.js';
import queryString from 'query-string';
import { selectPopulatedShipmentById } from '../shipments/duck/selectors.js';
import CommercialInvoiceProducts from './CommercialInvoiceProducts.js';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    }
}));

const CommercialInvoice = React.memo(function CommercialInvoice() {
    const location = useLocation();
    const classes = useStyles();
    const { shipment: shipmentId, step, document: documentId } = queryString.parse(location.search);
    const shipment = useSelector(state => selectPopulatedShipmentById(state, { shipmentId }));
    const initialCI = shipmentToCommercialInvoice(shipment, documentId);
    const [commercialInvoice, setCommercialInvoice] = useLocalStorage(SESSION_NEW_DOCUMENT, initialCI);

    const isEdit = useMemo(() => Boolean(documentId), [documentId]);

    return (
        <Paper className={ classes.root }>
            { step === 'details' &&
            <CommercialInvoiceDetails
                commercialInvoice={ commercialInvoice }
                setCommercialInvoice={ setCommercialInvoice }
                shipmentId={ shipmentId }
                documentId={ documentId }
                isEdit={ isEdit }
            /> }
            { step === 'products' &&
            <CommercialInvoiceProducts
                commercialInvoice={ commercialInvoice }
                setCommercialInvoice={ setCommercialInvoice }
                shipmentId={ shipmentId }
                documentId={ documentId }
                isEdit={ isEdit }
            /> }
        </Paper>
    )
});

export default CommercialInvoice;