import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { cleanNewShipment } from './duck/slice.js';
import { selectCurrentCompany, selectHomeStatus } from '../home/duck/selectors.js';
import { fetchShipments } from './duck/thunks.js';
import { determineStatus } from '../shared/utils/state.js';
import { selectShipmentDataStatus } from './duck/selectors.js';
import ShipmentsTable from './ShipmentsTable.js';
import Loader from '../shared/components/Loader.js';

const { newShipmentButtonLabel } = LANGUAGE.shipment.overview;

export default function ShipmentOverview() {
    const history = useHistory();
    const dispatch = useDispatch();
    const company = useSelector(selectCurrentCompany);
    const homeStatus = useSelector(selectHomeStatus);
    const shipmentDataStatus = useSelector(selectShipmentDataStatus);
    const status = determineStatus([homeStatus, shipmentDataStatus]);

    useEffect(() => {
        if (company) dispatch(fetchShipments({ companyId: company._id }));
    }, [company, dispatch]);

    const onNewOrderClick = () => {
        dispatch(cleanNewShipment());
        history.push('/home/shipments/new');
    }

    return (
        <>
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' &&
            <Paper>
                <ThemedButton
                    onClick={ onNewOrderClick }
                >
                    { newShipmentButtonLabel }
                </ThemedButton>
                <ShipmentsTable />
            </Paper>
            }
        </>
    )
}

