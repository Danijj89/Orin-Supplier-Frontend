import React, { useEffect, useRef } from 'react';
import { Box } from '@material-ui/core';
import CreateShipment from './CreateShipment.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCompany, selectHomeStatus } from '../home/duck/selectors.js';
import { cleanNewShipment } from './duck/slice.js';
import { isLoading } from '../shared/utils/store.js';
import Loader from '../shared/components/Loader.js';

export default function CreateShipmentContainer() {
    const dispatch = useDispatch();
    const company = useSelector(selectCurrentCompany);
    const homeStatus = useSelector(selectHomeStatus);
    const loading = isLoading([homeStatus]);

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current && company) {

            mounted.current = true;
        }
        return () => dispatch(cleanNewShipment());
    })

    return (
        <Box>
            { loading && <Loader />}
            { !loading && <CreateShipment company={company}/> }
        </Box>
    )
}