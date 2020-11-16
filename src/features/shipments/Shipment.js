import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import { useSelector } from 'react-redux';
import { selectShipmentById } from './duck/selectors.js';
import NavTabs from '../shared/components/NavTabs.js';
import ShipmentOrdersTable from './ShipmentOrdersTable.js';
import ShipmentInfoCard from './ShipmentInfoCard.js';
import DocumentStatusCard from './DocumentStatusCard.js';
import DocumentButton from './DocumentButton.js';
import ShipmentDocumentTable from './ShipmentDocumentTable.js';

const {
    editShipmentButtonLabel,
    tabsLabelsMap
} = LANGUAGE.shipment.shipment;

export default function Shipment() {
    const history = useHistory();
    const { id } = useParams();
    const shipment = useSelector(state => selectShipmentById(state, id));
    const [tabValue, setTabValue] = useState('orders');

    const onEditShipmentInfo = () =>
        history.push(`/home/shipments/edit/${ id }/details`);

    return (
        <Grid container>
            <Grid item lg={ 6 }>
                <ShipmentInfoCard shipment={ shipment }/>
            </Grid>
            <Grid item lg={ 6 }>
                <DocumentStatusCard shipment={ shipment }/>
            </Grid>
            <Grid container item xs={ 12 }>
                <ThemedButton onClick={ onEditShipmentInfo }>
                    { editShipmentButtonLabel }
                </ThemedButton>
                <DocumentButton />
            </Grid>
            <Grid item xs={ 12 }>
                <NavTabs
                    tabsLabelsMap={ tabsLabelsMap }
                    tabValue={ tabValue }
                    onChange={ setTabValue }
                />
                { tabValue === 'orders' && <ShipmentOrdersTable /> }
                { tabValue === 'documents' && <ShipmentDocumentTable />}
            </Grid>
        </Grid>
    )
}