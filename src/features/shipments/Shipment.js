import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import { useSelector } from 'react-redux';
import { selectShipmentById } from './duck/selectors.js';
import NavTabs from '../shared/components/NavTabs.js';
import ShipmentOrdersTable from './ShipmentOrdersTable.js';
import { makeStyles } from '@material-ui/core/styles';
import ShipmentInfoCard from './ShipmentInfoCard.js';
import DocumentStatusCard from './DocumentStatusCard.js';
import DocumentButton from './DocumentButton.js';
import ShipmentDocumentTable from './ShipmentDocumentTable.js';
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


export default function Shipment() {
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams();
    const location = useLocation();
    const { tab } = queryString.parse(location.search);
    const shipment = useSelector(state => selectShipmentById(state, id));
    const [tabValue, setTabValue] = useState(tab || 'orders');

    const onEditShipmentInfo = () =>
        history.push(`/home/shipments/edit/${ id }/details`);

    return (
        <Grid container className={ classes.root }>
            <Grid item lg={ 6 } sm= {12}>
                <ShipmentInfoCard shipment={ shipment }/>
            </Grid>
            <Grid item lg={ 6 } sm= {12}>
                <DocumentStatusCard shipment={ shipment }/>
            </Grid>
            <Grid container item xs={ 12 } className={ classes.shipmentActions }>
                <ThemedButton className={classes.editShipmentButton} onClick={ onEditShipmentInfo }>
                    { editShipmentButtonLabel }
                </ThemedButton>
                <DocumentButton/>
            </Grid>
            <Grid item xs={ 12 }>
                <Card>
                    <NavTabs
                        tabsLabelsMap={ tabsLabelsMap }
                        tabValue={ tabValue }
                        onChange={ setTabValue }
                        className={ classes.navTabs }
                    />
                    { tabValue === 'orders' && <ShipmentOrdersTable shipment={ shipment }/> }
                    { tabValue === 'documents' && <ShipmentDocumentTable /> }
                </Card>
            </Grid>
        </Grid>
    )
}