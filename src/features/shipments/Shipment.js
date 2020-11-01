import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import InfoCard from '../shared/wrappers/InfoCard.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectShipmentById } from './duck/selectors.js';
import NavTabs from '../shared/components/NavTabs.js';
import ShipmentOrdersTable from './ShipmentOrdersTable.js';
import { selectOrdersByIds } from '../orders/duck/selectors.js';

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
        console.log(acc);
        if (!acc.includes(item.order)) acc.push(item.order);
        return acc;
    }, []);
    const orders = useSelector(state => selectOrdersByIds(state, orderIds));
    const [tabValue, setTabValue] = useState('orders');

    const onEditShipmentInfo = () =>
        history.push(`/home/shipments/${ id }/edit/shipment`);

    const onEditOrders = () => history.push(``);

    return (
        <Grid container>
            <Grid item xs={ 6 }>
                <InfoCard/>
            </Grid>
            <Grid item xs={ 6 }>
                <InfoCard/>
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