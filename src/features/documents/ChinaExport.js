import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { selectPopulatedShipmentById } from '../shipments/duck/selectors.js';
import { shipmentToChinaExport } from '../shared/utils/entityConversion.js';
import ChinaExportDetails from './ChinaExportDetails.js';
import useLocalStorage from 'features/shared/hooks/useLocalStorage.js';
import { SESSION_NEW_DOCUMENT } from 'app/sessionKeys.js';
import ChinaExportDetailsOptional from './ChinaExportDetailsOptional.js';
import ChinaExportProducts from './ChinaExportProducts.js';

const ChinaExport = React.memo(function ChinaExport() {
    const location = useLocation();
    const { shipment: shipmentId, step, document: documentId } = queryString.parse(location.search);
    const shipment = useSelector(state => selectPopulatedShipmentById(state, { shipmentId }));
    const initialCE = shipmentToChinaExport(shipment, documentId);
    const [chinaExport, setChinaExport] = useLocalStorage(SESSION_NEW_DOCUMENT, initialCE);
    const isEdit = useMemo(() => Boolean(documentId), [documentId]);

    return (
        <Paper>
            { step === 'details' &&
            <ChinaExportDetails
                chinaExport={ chinaExport }
                setChinaExport={ setChinaExport }
                shipmentId={ shipmentId }
                consigneeId={ shipment.consignee._id }
                documentId={ documentId }
                isEdit={ isEdit }
            />
            }
            { step === 'optional' &&
            <ChinaExportDetailsOptional
                chinaExport={ chinaExport }
                setChinaExport={ setChinaExport }
                shipmentId={ shipmentId }
                documentId={ documentId }
                isEdit={ isEdit }
            />
            }
            { step === 'products' &&
            <ChinaExportProducts
                chinaExport={ chinaExport }
                setChinaExport={ setChinaExport }
                shipmentId={ shipmentId }
                documentId={ documentId }
                isEdit={ isEdit }
            />
            }
        </Paper>
    )
});

export default ChinaExport;