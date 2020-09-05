import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../constants.js';

import { yymmddToLocaleDate } from '../shared/utils.js';
import DocumentTag from '../shared/displays/DocumentTag.js';

import UnitCounter from '../shared/classes/UnitCounter.js';

import OrderInfoCard from './OrderInfoCard.js';

const {
    title, orderLabel, dateTitle, crdTitle, incotermTitle, quantityTitle
} = LANGUAGE.order.orderInfoTile;

const useStyles = makeStyles((theme) => ({
    row: {
        marginBottom: theme.spacing(0.5)
    },
    rowLabel: {
        color: theme.palette.tertiary['600'],
        marginRight: theme.spacing(2),
    }
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

    const FormattedTypography = ({ label, value }) =>
        <Grid container justify="flex-start" alignItems="center" item xs={ 12 } className={ classes.row }>
            <Typography className={ classes.rowLabel }>{ label }</Typography>
            <Typography>{ value }</Typography>
        </Grid>

    return (
        <OrderInfoCard title={ title }>
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
        </OrderInfoCard>
    )
}