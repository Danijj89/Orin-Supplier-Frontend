import React, { useMemo } from 'react';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { LANGUAGE } from '../../app/constants.js';
import ShipmentStatusPill from './ShipmentStatusPill.js';
import { dateToLocaleDate } from '../shared/utils/format.js';
import { Grid } from '@material-ui/core';
import DividerDataDisplay from '../shared/wrappers/DividerDisplay.js';

const {
    titleLabel,
    labels
} = LANGUAGE.shipment.shipment.shipmentInfoCard;

const ShipmentInfoCard = React.memo(function ShipmentInfoCard({ shipment }) {

    const leftData = useMemo(() => [
        { label: labels.status, value: <ShipmentStatusPill status={ shipment.status }/> },
        { label: labels.crd, value: dateToLocaleDate(shipment.crd) },
        { label: labels.del, value: shipment.del },
        { label: labels.carrier, value: shipment.carrier }
    ], [
        shipment.status,
        shipment.crd,
        shipment.del,
        shipment.carrier
    ]);

    const rightData = useMemo(() => [
        { label: labels.pol, value: shipment.pol },
        { label: labels.pod, value: shipment.pod },
        { label: labels.etd, value: shipment.etd },
        { label: labels.eta, value: shipment.eta }
    ], [
        shipment.pol,
        shipment.pod,
        shipment.etd,
        shipment.eta
    ]);

    return (
        <InfoCard
            title={ titleLabel }
            content={
                <Grid container>
                    <Grid container item md={ 6 }>
                        <DividerDataDisplay data={ leftData }/>
                    </Grid>
                    <Grid container item md={ 6 }>
                        <DividerDataDisplay data={ rightData }/>
                    </Grid>
                </Grid>
            }
        />
    )
});

export default ShipmentInfoCard;