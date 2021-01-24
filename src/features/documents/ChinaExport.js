import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { selectPopulatedShipmentById } from '../shipments/duck/selectors.js';
import { shipmentToChinaExport } from '../shared/utils/entityConversion.js';
import ChinaExportDetails from './ChinaExportDetails.js';
import useSessionStorage from '../shared/hooks/useSessionStorage.js';
import { SESSION_NEW_DOCUMENT } from 'app/sessionKeys.js';
import ChinaExportDetailsOptional from './ChinaExportDetailsOptional.js';
import ChinaExportProducts from './ChinaExportProducts.js';

const ChinaExport = React.memo(function ChinaExport() {
    const location = useLocation();
    const { shipment: shipmentId, step } = queryString.parse(location.search);
    const shipment = useSelector(state => selectPopulatedShipmentById(state, { shipmentId }));
    const initialCE = shipmentToChinaExport(shipment);
    const [chinaExport, setChinaExport] = useSessionStorage(SESSION_NEW_DOCUMENT, initialCE);

    return (
        <Paper>
            { step === 'details' &&
            <ChinaExportDetails
                chinaExport={ chinaExport }
                setChinaExport={ setChinaExport }
                shipmentId={ shipmentId }
                consigneeId={ shipment.consignee._id }
            />
            }
            { step === 'optional' &&
            <ChinaExportDetailsOptional
                chinaExport={ chinaExport }
                setChinaExport={ setChinaExport }
                shipmentId={ shipmentId }
            />
            }
            { step === 'products' &&
            <ChinaExportProducts
                chinaExport={ chinaExport }
                setChinaExport={ setChinaExport }
                shipmentId={ shipmentId }
            />
            }
        </Paper>
    )
});

export default ChinaExport;