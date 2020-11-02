import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectShipmentById } from './duck/selectors.js';
import { fetchShipmentById } from './duck/thunks.js';
import NavTabs from '../shared/components/NavTabs.js';

const { tabsLabelsMap } = LANGUAGE.shipment.editShipment;

export default function EditShipment() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [tabValue, setTabValue] = useState('shipment');
    const shipment = useSelector(state => selectShipmentById(state, id));

    useEffect(() => {
        if (!shipment) dispatch(fetchShipmentById({ id }));
    }, [dispatch, id, shipment]);

    return (
        <Card>
            <NavTabs
                tabsLabelsMap={ tabsLabelsMap }
                tabValue={ tabValue }
                onChange={ setTabValue }
            />
        </Card>
    )
}