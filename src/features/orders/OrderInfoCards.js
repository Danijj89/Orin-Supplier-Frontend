import React from 'react';
import { Grid } from '@material-ui/core';
import OverviewInfoCard from './OverviewInfoCard.js';
import OrderStatusInfoCard from './OrderStatusInfoCard.js';

export default function OrderInfoCards({ order }) {

    return (
        <Grid container>
            <Grid item xs={ 12 }>
                <OverviewInfoCard order={ order }/>
            </Grid>
            {/*<Grid item xs={ 6 }>*/}
            {/*    <OrderStatusInfoCard order={ order }/>*/}
            {/*</Grid>*/}
        </Grid>
    )
}