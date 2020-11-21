import React from 'react';
import { useHistory } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import { useSelector } from 'react-redux';
import { selectShipmentById } from '../shipments/duck/selectors.js';
import Grid from '@material-ui/core/Grid';
import ShipmentDocumentTable from '../shared/components/ShipmentDocumentTable.js';

const {
    titleLabel
} = LANGUAGE.order.order.orderDocuments.shipmentDocumentsCard;

const ShipmentDocumentsCard = React.memo(function ShipmentDocumentsCard({ shipmentId }) {
    const history = useHistory();
    const shipment = useSelector(state => selectShipmentById(state, shipmentId));

    const onShipmentClick = () => history.push(`/home/shipments/${ shipmentId }`);

    return (
        <Grid container>
            <Grid container item alignItems="center">
                <Typography variant="subtitle1">{ titleLabel }</Typography>
                <ThemedButton variant="text" onClick={ onShipmentClick }>
                    { shipment.ref }
                </ThemedButton>
            </Grid>
            <Divider/>
            <ShipmentDocumentTable shipmentId={ shipmentId } maxEmptyRows={ 2 }/>
        </Grid>
    )
});

export default ShipmentDocumentsCard;