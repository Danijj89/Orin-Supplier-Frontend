import React, { useCallback } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import NavTabs from '../shared/components/NavTabs.js';
import ShipmentOrdersTable from './ShipmentOrdersTable.js';
import { makeStyles } from '@material-ui/core/styles';
import ShipmentInfoCard from './ShipmentInfoCard.js';
import DocumentStatusCard from './DocumentStatusCard.js';
import DocumentButton from './DocumentButton.js';
import ShipmentDocumentTable from '../shared/components/ShipmentDocumentTable.js';
import queryString from 'query-string';
import Card from '@material-ui/core/Card';

const {
    editShipmentButtonLabel,
    tabsLabelsMap
} = LANGUAGE.shipment.shipment;

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            paddingLeft: theme.spacing(10),
            paddingRight: theme.spacing(10),
        },
    },
    shipmentActions: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    navTabs: {
        marginTop: theme.spacing(5),
    },
    editShipmentButton: {
        marginRight: theme.spacing(2),
    }

}));


const Shipment = React.memo(function Shipment() {
    const classes = useStyles();
    const history = useHistory();
    const { id: shipmentId } = useParams();
    const location = useLocation();
    const { tab } = queryString.parse(location.search);
    const tabValue = tab || 'orders';

    const onTabChange = useCallback(
        (newValue) => history.push(`${ location.pathname }?tab=${ newValue }`),
        [history, location.pathname]);

    const onEditShipmentInfo = useCallback(
        () => history.push(`/home/shipments/${ shipmentId }/edit?tab=shipment`),
        [history, shipmentId]);

    return (
        <Grid container className={ classes.root }>
            <Grid item lg={ 6 } sm={ 12 }>
                <ShipmentInfoCard/>
            </Grid>
            <Grid item lg={ 6 } sm={ 12 }>
                <DocumentStatusCard/>
            </Grid>
            <Grid container item xs={ 12 } className={ classes.shipmentActions }>
                <ThemedButton className={ classes.editShipmentButton } onClick={ onEditShipmentInfo }>
                    { editShipmentButtonLabel }
                </ThemedButton>
                <DocumentButton/>
            </Grid>
            <Grid item xs={ 12 }>
                <Card>
                    <NavTabs
                        tabsLabelsMap={ tabsLabelsMap }
                        tabValue={ tabValue }
                        onChange={ onTabChange }
                        className={ classes.navTabs }
                    />
                    { tabValue === 'orders' && <ShipmentOrdersTable /> }
                    { tabValue === 'documents' && <ShipmentDocumentTable /> }
                </Card>
            </Grid>
        </Grid>
    )
});

export default Shipment;