import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import InfoCard from '../shared/wrappers/InfoCard.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import { useSelector } from 'react-redux';
import { selectShipmentById } from './duck/selectors.js';
import NavTabs from '../shared/components/NavTabs.js';
import ShipmentOrdersTable from './ShipmentOrdersTable.js';
import { selectOrdersByIds } from '../orders/duck/selectors.js';
import ShipmentInfoCard from './ShipmentInfoCard.js';

const {
    editShipmentButtonLabel,
    tabsLabelsMap,
    editOrdersButtonLabel
} = LANGUAGE.shipment.shipment;

export default function Shipment() {
    const history = useHistory();
    const { id } = useParams();
    const shipment = useSelector(state => selectShipmentById(state, id));
    const orderIds = shipment.items.reduce((acc, item) => {
        if (!acc.includes(item.order)) acc.push(item.order);
        return acc;
    }, []);
    const orders = useSelector(state => selectOrdersByIds(state, orderIds));
    const [tabValue, setTabValue] = useState('orders');

    const onEditShipmentInfo = () =>
        history.push(`/home/shipments/edit/${ id }/details`);

    const onEditOrders = () => history.push(`/home/shipments/edit/${ id }`);

    return (
        <Grid container>
            <Grid item xs={ 6 }>
                <ShipmentInfoCard shipment={ shipment }/>
            </Grid>
            <Grid item xs={ 6 }>
                <ShipmentInfoCard shipment={ shipment }/>
            </Grid>
            <Grid item xs={ 12 }>
                <ThemedButton onClick={ onEditShipmentInfo }>
                    { editShipmentButtonLabel }
                </ThemedButton>
            </Grid>
            <Grid item xs={ 12 }>
                <NavTabs
                    tabsLabelsMap={ tabsLabelsMap }
                    tabValue={ tabValue }
                    onChange={ setTabValue }
                />
                <ThemedButton onClick={ onEditOrders }>
                    { editOrdersButtonLabel }
                </ThemedButton>
                <ShipmentOrdersTable orders={ orders }/>
            </Grid>
        </Grid>
    )
}