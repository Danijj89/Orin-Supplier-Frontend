import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Card, Typography } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import NavTabs from '../shared/components/NavTabs.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectShipmentById, selectShipmentError, selectShipmentStatus } from './duck/selectors.js';
import ShipmentInfo from './ShipmentInfo.js';
import Loader from '../shared/components/Loader.js';
import SuccessMessage from '../shared/components/SuccessMessage.js';
import { cleanShipmentStatus } from './duck/slice.js';
import ErrorDisplay from '../shared/components/ErrorDisplay.js';
import ShipmentProductTable from './ShipmentProductTable.js';
import ShipmentMeasureTable from './ShipmentMeasureTable.js';
import ShipmentConsolidationTable from './ShipmentConsolidationTable.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';

const {
    titleLabel,
    cancelButtonLabel,
    tabsLabelsMap,
    successMessage
} = LANGUAGE.shipment.editShipment;

const EditShipment = React.memo(function EditShipment() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const shipmentStatus = useSelector(selectShipmentStatus);
    const shipmentError = useSelector(selectShipmentError);
    const shipment = useSelector(state => selectShipmentById(state, id));

    const [tabValue, setTabValue] = useState('shipment');

    const onTabChange = useCallback(
        (newTab) => {
            setTabValue(newTab);
            dispatch(cleanShipmentStatus());
        },
        [dispatch]);

    const onCancel = useCallback(
        () => history.goBack(),
        [history]);

    useEffect(() => {
        dispatch(cleanShipmentStatus());
    }, [dispatch]);

    return (
        <Card>
            <ThemedButton onClick={ onCancel }>{ cancelButtonLabel }</ThemedButton>
            <Typography variant="h5">{ titleLabel }</Typography>
            <NavTabs
                tabsLabelsMap={ tabsLabelsMap }
                tabValue={ tabValue }
                onChange={ onTabChange }
            />
            { shipmentStatus === 'REJECTED' && <ErrorDisplay errors={ [shipmentError] }/> }
            { shipmentStatus === 'FULFILLED' && <SuccessMessage message={ successMessage }/> }
            { shipmentStatus === 'PENDING' && <Loader/> }
            <Box>
                <Box hidden={ tabValue !== 'shipment' }>
                    <ShipmentInfo shipment={ shipment }/>
                </Box>
                <Box hidden={ tabValue !== 'products' }>
                    <ShipmentProductTable shipment={ shipment }/>
                </Box>
                <Box hidden={ tabValue !== 'measures' }>
                    <ShipmentMeasureTable shipment={ shipment }/>
                </Box>
                <Box hidden={ tabValue !== 'consolidation' }>
                    <ShipmentConsolidationTable shipment={ shipment }/>
                </Box>
            </Box>
        </Card>
    )
});

export default EditShipment;