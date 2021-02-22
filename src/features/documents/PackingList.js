import React, { useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { selectPopulatedShipmentById } from '../shipments/duck/selectors.js';
import useLocalStorage from 'features/shared/hooks/useLocalStorage.js';
import { SESSION_NEW_DOCUMENT } from 'app/sessionKeys.js';
import PackingListDetails from './PackingListDetails.js';
import { shipmentToPackingList } from '../shared/utils/entityConversion.js';
import PackingListProducts from './PackingListProducts.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    }
}));

const PackingList = React.memo(function PackingList() {

    const location = useLocation();
    const classes = useStyles();
    const { shipment: shipmentId, step, document: documentId } = queryString.parse(location.search);
    const shipment = useSelector(state => selectPopulatedShipmentById(state, { shipmentId }));
    const initialPL = shipmentToPackingList(shipment, documentId);
    const [packingList, setPackingList] = useLocalStorage(SESSION_NEW_DOCUMENT, initialPL);
    const isEdit = useMemo(() => Boolean(documentId), [documentId]);

    return (
        <Paper className={ classes.root }>
            { step === 'details' &&
            <PackingListDetails
                packingList={ packingList }
                setPackingList={ setPackingList }
                shipmentId={ shipmentId }
                documentId={ documentId }
                isEdit={ isEdit }
            /> }
            { step === 'products' &&
            <PackingListProducts
                packingList={ packingList }
                setPackingList={ setPackingList }
                shipmentId={ shipmentId }
                documentId={ documentId }
                isEdit={ isEdit }
            /> }
        </Paper>
    )
});

export default PackingList;