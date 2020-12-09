import React from 'react';
import { useHistory } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useSelector } from 'react-redux';
import { selectShipmentById } from '../shipments/duck/selectors.js';
import Grid from '@material-ui/core/Grid';
import ShipmentDocumentTable from '../shared/components/ShipmentDocumentTable.js';
import { makeStyles } from '@material-ui/core/styles';


const {
    titleLabel
} = LANGUAGE.order.order.orderDocuments.shipmentDocumentsCard;

const useStyles = makeStyles((theme) => ({
    shipmentIDLabel: {
        paddingLeft: theme.spacing(2),
    }
}));

const ShipmentDocumentsCard = React.memo(function ShipmentDocumentsCard({ shipmentId, className }) {
    const classes = useStyles();
    const history = useHistory();
    const shipment = useSelector(state => selectShipmentById(state, { shipmentId }));

    const onShipmentClick = () => history.push(`/home/shipments/${ shipmentId }`);

    return (
        <Grid className = {className} container>
            <Grid container item alignItems="center">
                <Typography className={classes.shipmentIDLabel} variant="subtitle1">{ titleLabel }</Typography>
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