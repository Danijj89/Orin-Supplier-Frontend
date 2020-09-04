import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Typography, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../constants.js';
import { useDispatch } from 'react-redux';
import { deleteOrder } from './duck/thunks.js';
import { yymmddToLocaleDate } from '../shared/utils.js';
import DocumentTag from '../shared/displays/DocumentTag.js';
import FeatureInProgressTag from '../shared/displays/FeatureInProgressTag.js';
import DeleteButton from '../shared/buttons/DeleteButton.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';

const {
    title, orderLabel, dateTitle, crdTitle, editButton, incotermTitle, quantityTitle,
    deleteOrderDialogCancelButton, deleteOrderDialogConfirmButton, deleteOrderDialogMessage
} = LANGUAGE.order.orderInfoTile;

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2),
        height: 260,
        minHeight: 240
    },
    titleRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        height: 52,
        color: theme.palette.tertiary['700']
    },
    title: {
        fontWeight: 'bold'
    },
    bottomPanel: {
        padding: theme.spacing(2)
    },
    row: {
        marginBottom: theme.spacing(0.5)
    },
    rowLabel: {
        color: theme.palette.tertiary['600'],
        marginRight: theme.spacing(2),
    },
    edit: {
        width: '10%',
        minWidth: 70,
        height: '80%'
    },
}));

export default function OrderInfoTile({ order }) {
    const classes = useStyles();
    const {
        poRef: orderNumber,
        date: orderDate,
        crd: cargoReadyDay,
        totalQ: totalQuantity,
        incoterm,
        documents
    } = order;
    const dispatch = useDispatch();
    const history = useHistory();

    const onDeleteClick = () => {
        dispatch(deleteOrder(order._id));
        history.push('/home/orders');
    }

    const FormattedTypography = ({ label, value }) =>
        <Grid container justify="flex-start" alignItems="center" item xs={ 12 } className={ classes.row }>
            <Typography className={ classes.rowLabel }>{ label }</Typography>
            <Typography>{ value }</Typography>
        </Grid>

    return (
        <Card className={ classes.card } elevation={ 3 }>
            <Grid container>
                <Grid
                    container
                    item
                    className={ classes.titleRow }
                    xs={ 12 }
                >
                    <Grid container item justify="flex-start" alignItems="center" xs={ 7 }>
                        <Typography variant="h5" className={ classes.title }>{ title }</Typography>
                    </Grid>
                    <Grid container item justify="flex-end" alignItems="center" xs={ 5 }>
                        <DeleteButton onDeleteClick={ onDeleteClick } deleteMessage={ deleteOrderDialogMessage }/>
                        <ThemedButton icon={FeatureInProgressTag} text={ editButton } variant="outlined" styles={ classes.edit }/>
                    </Grid>
                </Grid>
                <Grid item xs={ 12 }>
                    <Divider/>
                </Grid>
                <Grid container item xs={ 12 } className={ classes.bottomPanel }>
                    <FormattedTypography label={ orderLabel } value={ orderNumber }/>
                    <FormattedTypography label={ dateTitle } value={ yymmddToLocaleDate(orderDate) }/>
                    <FormattedTypography label={ crdTitle } value={ yymmddToLocaleDate(cargoReadyDay) }/>
                    <FormattedTypography label={ quantityTitle }
                                         value={ new UnitCounter([], totalQuantity).stringRep }/>
                    <FormattedTypography label={ incotermTitle } value={ incoterm }/>
                    <Grid container justify="flex-end" alignItems="flex-start" item xs={ 12 }>
                        { documents && Object.entries(documents).map(([docType, docId], index) =>
                            <DocumentTag key={ index } docType={ docType }/>
                        ) }
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}