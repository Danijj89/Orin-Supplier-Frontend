import React, { useCallback, useMemo } from 'react';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { Grid } from '@material-ui/core';
import DividerDataDisplay from '../shared/wrappers/DividerDisplay.js';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectShipmentById } from './duck/selectors.js';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '250px',
        marginLeft: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            marginLeft: theme.spacing(0),
            marginBottom: theme.spacing(2),
    },
    }
}));

const {
    titles,
    labels
} = LANGUAGE.shipment.shipment;

const DocumentStatusCard = React.memo(function DocumentStatusCard() {
    const classes = useStyles();
    const { id: shipmentId } = useParams();
    const shipment = useSelector(state => selectShipmentById(state, { shipmentId }));

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

    const content = useMemo(
        () =>
            <Grid container>
                <Grid container item md={7}>
                    <DividerDataDisplay data={ data }/>
                </Grid>
            </Grid>
    , [data]);

    return (
        <InfoCard
            title={ titles.documentStatus }
            className={ classes.root }
            content={ content }
        />
    )
});

export default DocumentStatusCard;