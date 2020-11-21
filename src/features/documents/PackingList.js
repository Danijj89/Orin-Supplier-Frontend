import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { selectShipmentById } from '../shipments/duck/selectors.js';
import useSessionStorage from '../shared/hooks/useSessionStorage.js';
import { SESSION_NEW_DOCUMENT } from '../../app/sessionKeys.js';
import PackingListDetails from './PackingListDetails.js';
import { shipmentToPackingList } from '../shared/utils/entityConversion.js';
import PackingListProducts from './PackingListProducts.js';

const PackingList = React.memo(function PackingList() {

    const location = useLocation();
    const { shipment: shipmentId } = queryString.parse(location.search);
    const shipment = useSelector(state => selectShipmentById(state, shipmentId));
    const [step, setStep] = useState('details');
    const initialPL = shipmentToPackingList(shipment);
    const [packingList, setPackingList] = useSessionStorage(SESSION_NEW_DOCUMENT, initialPL);

    return (
        <Paper>
            { step === 'details' &&
            <PackingListDetails
                packingList={ packingList }
                setPackingList={ setPackingList }
                shipmentId={ shipmentId }
                setStep={ setStep }
            /> }
            { step === 'products' &&
            <PackingListProducts
                packingList={ packingList }
                setPackingList={ setPackingList }
                shipmentId={ shipmentId }
                setStep={ setStep }
            /> }
        </Paper>
    )
});

export default PackingList;