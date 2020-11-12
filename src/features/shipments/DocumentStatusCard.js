import React, { useMemo } from 'react';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { LANGUAGE } from '../../app/constants.js';
import { Grid } from '@material-ui/core';
import DividerDataDisplay from '../shared/wrappers/DividerDisplay.js';

const {
    titleLabel,
    labels
} = LANGUAGE.shipment.shipment.documentStatusCard;

const DocumentStatusCard = React.memo(function DocumentStatusCard({ shipment }) {

    const data = useMemo(() => [
        { label: labels.docCutOff, value: shipment.docCutOff },
        { label: labels.bol, value: shipment.bol },
        { label: labels.bolType, value: shipment.bolType },
        { label: labels.released, value: shipment.released }
    ], [
        shipment.docCutOff,
        shipment.bol,
        shipment.bolType,
        shipment.released
    ]);

    return (
        <InfoCard
            title={ titleLabel }
            content={
                <Grid container>
                    <Grid container item md={6}>
                        <DividerDataDisplay data={ data }/>
                    </Grid>
                </Grid>
            }
        />
    )
});

export default DocumentStatusCard;