import React from 'react';
import { Grid } from '@material-ui/core';
import OrderOverviewInfoCard from './OrderOverviewInfoCard.js';
import OrderStatusInfoCard from './OrderStatusInfoCard.js';

export default function OrderDetails({ order }) {

    return (
        <Grid container>
            <Grid item xs={ 6 }>
                { order && <OrderOverviewInfoCard order={ order }/> }
            </Grid>
            <Grid item xs={ 6 }>
                { order && <OrderStatusInfoCard order={ order }/> }
            </Grid>
        </Grid>
    )
}