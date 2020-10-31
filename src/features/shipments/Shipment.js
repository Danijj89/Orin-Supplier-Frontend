import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import InfoCard from '../shared/wrappers/InfoCard.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectShipmentById } from './duck/selectors.js';
import { fetchShipmentById } from './duck/thunks.js';

const { editShipmentButtonLabel } = LANGUAGE.shipment.shipment;

export default function Shipment() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const shipment = useSelector(state => selectShipmentById(state, id));

    useEffect(() => {
        if (!shipment) dispatch(fetchShipmentById({ id }));
    }, [dispatch, id, shipment]);

    const onEditShipmentInfo = () =>
        history.push(`/home/shipments/${ id }/edit/shipment`);

    return (
        <Grid container>
            <Grid item xs={ 6 }>
                <InfoCard/>
            </Grid>
            <Grid item xs={ 6 }>
                <InfoCard/>
            </Grid>
            <ThemedButton
                onClick={ onEditShipmentInfo }
            >
                { editShipmentButtonLabel }
            </ThemedButton>
        </Grid>
    )
}