import React from 'react';
import { Grid } from '@material-ui/core';
import DetailsInfoCard from './DetailsInfoCard.js';
import StatusInfoCard from './StatusInfoCard.js';
import TextAreaCard from '../shared/components/TextAreaCard.js';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch } from 'react-redux';
import { updateOrderNotes } from './duck/thunks.js';
import OrderProductTable from './OrderProductTable.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import EditOrderProductsButton from './EditOrderProductsButton.js';

const { notesLabel, productTableTitleLabel } = LANGUAGE.order.order.orderDetails;

export default function OrderDetails({ order }) {
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
            <Grid item xs={ 12 }>
                <InfoCard
                    title={ productTableTitleLabel }
                    button={ <EditOrderProductsButton order={ order }/> }
                    content={ <OrderProductTable order={ order }/> }
                />
            </Grid>
        </Grid>
    )
}