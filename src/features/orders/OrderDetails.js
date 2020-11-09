import React from 'react';
import { Grid } from '@material-ui/core';
import DetailsInfoCard from './DetailsInfoCard.js';
import StatusInfoCard from './StatusInfoCard.js';
import TextAreaCard from '../shared/components/TextAreaCard.js';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderNotes } from './duck/thunks.js';
import OrderProductTable from './OrderProductTable.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import EditOrderProductsButton from './EditOrderProductsButton.js';
import { makeStyles } from '@material-ui/core/styles';
import { selectActiveProductMap } from '../products/duck/selectors.js';

const useStyles = makeStyles((theme) => ({
    detailsInfoCard: {
        marginBottom: theme.spacing(1),
    },
    notes: {
        paddingLeft: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '0',
            marginTop: theme.spacing(1)
        },
    },
    productsTable: {
        marginTop: theme.spacing(3)
    },
}));

const { notesLabel, productTableTitleLabel } = LANGUAGE.order.order.orderDetails;

export default function OrderDetails({ order }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const productMap = useSelector(selectActiveProductMap);
    const onNotesSubmit = (notes) =>
        dispatch(updateOrderNotes({ id: order._id, notes }));

    return (
        <Grid container className={ classes.root }>
            <Grid className={ classes.detailsInfoCard } item xs={ 12 }>
                <DetailsInfoCard order={ order }/>
            </Grid>
            <Grid item xs={ 12 } md={ 6 }>
                <StatusInfoCard orderId={ order._id } status={ order.status }/>
            </Grid>
            <Grid container item xs={ 12 } md={ 6 } className={ classes.notes }>
                <TextAreaCard
                    titleLabel={ notesLabel }
                    value={ order.notes }
                    onSubmit={ onNotesSubmit }
                />
            </Grid>
            <Grid item xs={ 12 } className={ classes.productsTable }>
                <InfoCard
                    title={ productTableTitleLabel }
                    button={ <EditOrderProductsButton order={ order } productMap={ productMap }/> }
                    content={ <OrderProductTable order={ order }/> }
                />
            </Grid>
        </Grid>
    )
}