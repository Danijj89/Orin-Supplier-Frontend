import React, { useCallback, useMemo } from 'react';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { LANGUAGE, LOCALE } from '../../app/utils/constants.js';
import { dateToLocaleDate } from '../shared/utils/format.js';
import { Grid } from '@material-ui/core';
import DividerDataDisplay from '../shared/wrappers/DividerDisplay.js';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectShipmentById } from './duck/selectors.js';
import { getOptionId, getOptionLabel } from '../../app/utils/options/getters.js';
import StatusDropdown from '../shared/components/StatusDropdown.js';
import { selectShipmentStatuses } from '../../app/duck/selectors.js';
import { updateShipment } from './duck/thunks.js';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '250px',
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            marginRight: theme.spacing(0),
            marginBottom: theme.spacing(2),
        }
    }
}));

const {
    titleLabel,
    labels
} = LANGUAGE.shipment.shipment.shipmentInfoCard;

const ShipmentInfoCard = React.memo(function ShipmentInfoCard() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id: shipmentId } = useParams();
    const shipment = useSelector(state => selectShipmentById(state, { shipmentId }));
    const shipmentStatusOptions = useSelector(selectShipmentStatuses);

    const onStatusChange = useCallback(
        (newStatus) => dispatch(updateShipment(
            { shipmentId, update: { status: getOptionId(newStatus) } }
        )),
        [dispatch, shipmentId]);

    const leftData = useMemo(() => [
        {
            label: labels.status,
            value: <StatusDropdown
                status={ shipment.status }
                statuses={ shipmentStatusOptions }
                colorMap="shipment"
                onStatusChange={ onStatusChange }
            />
        },
        { label: labels.crd, value: dateToLocaleDate(shipment.crd) },
        { label: labels.del, value: getOptionLabel(shipment.del, LOCALE) },
        { label: labels.carrier, value: shipment.carrier }
    ], [
        shipment.status,
        shipment.crd,
        shipment.del,
        shipment.carrier,
        shipmentStatusOptions,
        onStatusChange
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

    const content = useCallback(
        () =>
            <Grid container>
                <Grid container item sm={ 6 }>
                    <DividerDataDisplay data={ leftData }/>
                </Grid>
                <Grid container item sm={ 6 }>
                    <DividerDataDisplay data={ rightData }/>
                </Grid>
            </Grid>
        , [leftData, rightData]);

    return (
        <InfoCard
            title={ titleLabel }
            className={ classes.root }
            content={ content() }
        />
    )
});

export default ShipmentInfoCard;