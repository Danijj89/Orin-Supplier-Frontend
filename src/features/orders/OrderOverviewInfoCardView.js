import React from 'react';
import { getCurrencySymbol, dateToLocaleDate } from '../shared/utils/random.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../constants.js';

const useStyles = makeStyles((theme) => ({
    row: {
        padding: theme.spacing(0.5),
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    rowLabel: {
        color: theme.palette.tertiary['600'],
        marginRight: theme.spacing(2)
    }
}));

const { orderLabel, dateTitle, crdTitle, incotermTitle,
    quantityTitle, remarksLabel, companyNameLabel,
    companyAddressLabel, totalAmountLabel } = LANGUAGE.order.orderInfoTile;

export default function OrderOverviewInfoCardView({ order }) {
    const classes = useStyles();
    const currencySymbol = getCurrencySymbol(order.currency);

    const FormattedTypography = ({ label, value }) =>
        <Grid item xs={ 6 } className={ classes.row }>
            <Typography className={ classes.rowLabel } variant="body2">{ label }</Typography>
            <Typography variant="body2">{ value }</Typography>
        </Grid>

    return (
        <Grid container alignItems="center">
            <FormattedTypography label={ orderLabel } value={ order.poRef }/>
            <FormattedTypography label={ remarksLabel } value={ order.remarks }/>
            <FormattedTypography label={ dateTitle } value={ dateToLocaleDate(order.date) }/>
            <FormattedTypography label={ crdTitle } value={ dateToLocaleDate(order.crd) }/>
            <FormattedTypography label={ companyNameLabel } value={ order.toName }/>
            <FormattedTypography label={ quantityTitle }
                                 value={ new UnitCounter([], order.totalQ).stringRep }/>
            <FormattedTypography label={ companyAddressLabel } value={ order.toAdd }/>
            <FormattedTypography label={ totalAmountLabel }
                                 value={ `${currencySymbol} ${order.totalA}` }/>
            <FormattedTypography label={ incotermTitle } value={ order.incoterm }/>
        </Grid>
    )
}