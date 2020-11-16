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
import { makeStyles } from '@material-ui/core/styles';
import ColumnInfoDisplay from '../shared/wrappers/ColumnInfoDisplay.js';
import { dateToLocaleDate } from '../shared/utils/format.js';

const {
    editShipmentButtonLabel,
    tabsLabelsMap,
    editOrdersButtonLabel
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
    shipmentInfo: {
        marginRight: theme.spacing(1),
    },
    docInfo: {
        marginLeft: theme.spacing(1),
    },
}));


export default function Shipment() {
    const classes = useStyles();
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
        history.push(`/home/shipments/edit/${id}/details`);

    const onEditOrders = () => history.push(`/home/shipments/edit/${id}`);

    console.log(shipment);

    const leftData = [
        { label: "Status", value: shipment.status },
        { label: "Cargo Ready", value: shipment?.crd ? dateToLocaleDate(shipment?.crd) : "-" },
        { label: "Mode", value: shipment?.del ? shipment?.del : "-" },
        { label: "Forwarder", value: shipment?.carrier ? shipment?.carrier : "-" }
    ];

    const rightData = [
        { label: "POL", value: shipment?.pol ? shipment?.pol : "-" },
        { label: "POD", value: shipment?.pod ? shipment?.pod : "-" },
        { label: "ETD", value: shipment?.etd ? dateToLocaleDate(shipment?.etd) : "-"  },
        { label: "ETA", value: shipment?.eta ? dateToLocaleDate(shipment?.eta) : "-" }
    ];

    return (
        <Grid container className={ classes.root }>
            <Grid item xs={ 6 }>
                <InfoCard
                    title = "Shipment Information"
                    shipment = {shipment}
                    className = {classes.shipmentInfo}
                    content={
                        <ColumnInfoDisplay
                            leftData={ leftData }
                            rightData={ rightData }
                        />
                    }
                />
            </Grid>
            <Grid item xs={ 6 }>
                <InfoCard
                    title = "Document Status"
                    className = {classes.docInfo}
                />
            </Grid>
            <Grid container item xs={ 12 } className = {classes.shipmentActions} >
                <ThemedButton onClick={ onEditShipmentInfo }>
                    { editShipmentButtonLabel }
                </ThemedButton>
            </Grid>
            <Grid item xs={ 12 }>
                <NavTabs
                    tabsLabelsMap={ tabsLabelsMap }
                    tabValue={ tabValue }
                    onChange={ setTabValue }
                    className={classes.navTabs}
                />
                <ThemedButton variant={"outlined"} className={classes.shipmentActions} onClick={ onEditOrders }>
                    { editOrdersButtonLabel }
                </ThemedButton>
                <ShipmentOrdersTable orders={ orders }/>
            </Grid>
        </Grid>
    )
}