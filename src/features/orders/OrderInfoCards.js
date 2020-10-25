import React from 'react';
import { Grid } from '@material-ui/core';
import DetailsInfoCard from './DetailsInfoCard.js';
import StatusInfoCard from './StatusInfoCard.js';

export default function OrderInfoCards({ order }) {

    return (
        <Grid container>
            <Grid item xs={ 12 }>
                <DetailsInfoCard order={ order }/>
            </Grid>
            <Grid item xs={ 6 }>
                <StatusInfoCard orderId={ order._id } status={ order.status }/>
            </Grid>
        </Grid>
    )
}