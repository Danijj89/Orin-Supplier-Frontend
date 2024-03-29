import React, { useCallback } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from 'app/utils/constants.js';
import NavTabs from '../shared/components/NavTabs.js';
import ShipmentOrdersTable from './ShipmentOrdersTable.js';
import { makeStyles } from '@material-ui/core/styles';
import ShipmentInfoCard from './ShipmentInfoCard.js';
import DocumentStatusCard from './DocumentStatusCard.js';
import DocumentButton from './DocumentButton.js';
import ShipmentDocumentTable from 'features/shipments/ShipmentDocumentTable.js';
import queryString from 'query-string';
import Card from '@material-ui/core/Card';
import { UPDATE_ANY, UPDATE_OWN } from '../admin/utils/actions.js';
import ShipmentPermission from '../shared/permissions/ShipmentPermission.js';

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
    },
    mobilePadding: {
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        }
    }
}));

const {
    buttons,
    tabLabels
} = LANGUAGE.shipment.shipment;

const Shipment = React.memo(function Shipment() {
    const classes = useStyles();
    const history = useHistory();
    const { id: shipmentId } = useParams();
    const location = useLocation();
    const { tab = 'orders' } = queryString.parse(location.search);

    const onTabChange = useCallback(
        (newValue) => history.push(`${ location.pathname }?tab=${ newValue }`),
        [history, location.pathname]);

    const onEditShipmentInfo = useCallback(
        () => history.push(`/home/shipments/${ shipmentId }/edit?tab=shipment`),
        [history, shipmentId]);

    return (
        <Grid container className={ classes.root }>
            <Grid item lg={ 6 } sm={ 12 } className={classes.mobilePadding}>
                <ShipmentInfoCard/>
            </Grid>
            <Grid item lg={ 6 } sm={ 12 }>
                <DocumentStatusCard/>
            </Grid>
            <Grid container item xs={ 12 } className={ classes.shipmentActions } >
                <ShipmentPermission action={ [UPDATE_ANY, UPDATE_OWN] } shipmentId={ shipmentId }>
                    <ThemedButton className={ classes.editShipmentButton } onClick={ onEditShipmentInfo }>
                        { buttons.editShipment }
                    </ThemedButton>
                </ShipmentPermission>
                <DocumentButton className={classes.mobilePadding}/>
            </Grid>
            <Grid item xs={ 12 }>
                <Card>
                    <NavTabs
                        tabsLabelsMap={ tabLabels }
                        tabValue={ tab }
                        onChange={ onTabChange }
                        className={ classes.navTabs }
                    />
                    { tab === 'orders' && <ShipmentOrdersTable shipmentId={ shipmentId }/> }
                    { tab === 'documents' && <ShipmentDocumentTable shipmentId={ shipmentId }/> }
                </Card>
            </Grid>
        </Grid>
    )
});

export default Shipment;



