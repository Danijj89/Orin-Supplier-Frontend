import React from 'react';
import { Grid } from '@material-ui/core';
import DetailsInfoCard from './DetailsInfoCard.js';
import StatusInfoCard from './StatusInfoCard.js';
import TextAreaCard from '../shared/components/TextAreaCard.js';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch } from 'react-redux';
import { updateOrderNotes } from './duck/thunks.js';

const { notesLabel } = LANGUAGE.order.order.orderInfoCards;

export default function OrderInfoCards({ order }) {
    const dispatch = useDispatch();

    const onNotesSubmit = (notes) =>
        dispatch(updateOrderNotes({ id: order._id, notes }));



    return (
        <Grid container>
            <Grid item xs={ 12 }>
                <DetailsInfoCard order={ order }/>
            </Grid>
            <Grid item xs={ 6 }>
                <StatusInfoCard orderId={ order._id } status={ order.status }/>
            </Grid>
            <Grid container item xs={ 6 }>
                <TextAreaCard
                    titleLabel={ notesLabel }
                    value={ order.notes }
                    onSubmit={ onNotesSubmit }
                />
            </Grid>
        </Grid>
    )
}