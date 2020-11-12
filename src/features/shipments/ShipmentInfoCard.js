import React, { useMemo } from 'react';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { LANGUAGE } from '../../app/constants.js';
import ColumnInfoDisplay from '../shared/wrappers/ColumnInfoDisplay.js';
import ShipmentStatusPill from './ShipmentStatusPill.js';

const {
    titleLabel,
    labels
} = LANGUAGE.shipment.shipment.shipmentInfoCard;

const ShipmentInfoCard = React.memo(function ShipmentInfoCard({ shipment }) {

    const leftData = useMemo(() => [
        { label: labels.status, value: <ShipmentStatusPill status={ shipment.status }/> },
        { label: labels.crd, value: shipment.crd },
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
                <ColumnInfoDisplay
                    leftData={ leftData }
                    rightData={ rightData }
                />
            }
        />
    )
});

export default ShipmentInfoCard;