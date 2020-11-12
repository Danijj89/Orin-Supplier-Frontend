import React from 'react';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { LANGUAGE } from '../../app/constants.js';
import { Grid, Typography } from '@material-ui/core';

const {
    titleLabel,
    labels
} = LANGUAGE.shipment.shipment.documentStatusCard;

const DocumentStatusCard = React.memo(function DocumentStatusCard({ shipment }) {
    return (
        <InfoCard
            title={ titleLabel }
            content={
                <Grid container>
                    <Grid container item xs={ 6 }>
                        <Grid item>
                            <Typography>{ labels.docCutOff }</Typography>
                            <Typography>{ shipment.docCutOff }</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>{ labels.docCutOff }</Typography>
                            <Typography>{ shipment.docCutOff }</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            }
        />
    )
});

export default DocumentStatusCard;