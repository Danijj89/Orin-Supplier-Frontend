import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { getStringFromTotalQuantityObject, yymmddToLocaleDate } from './helpers.js';
import { LANGUAGE } from '../../constants.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete.js';

const { dateTitle, crdTitle , editButton, incotermTitle , quantityTitle } = LANGUAGE.orderInfoTile;

const useStyles = makeStyles({
    card: {
        margin: '2% 1%',
        padding: '2%'
    },
    status: {
        display: 'inline-block',
        borderRadius: '6px',
        background: 'grey',
        padding: '0.5% 3%',
        color: 'white',
        margin: '0.5%'
    },
    poRef: {
        margin: '1% 0.5%',
        fontWeight: 'bold'
    },
    info: {
        margin: '0.5%',
    },
    title: {
        display: 'inline-block',
        fontWeight: 'lighter'
    },
    value: {
        display: 'inline-block',
    }
})

export default function OrderInfoTile({order}) {
    const classes = useStyles();
    const { status, poRef: orderNumber, date: orderDate, crd: cargoReadyDay, totalQ: totalQuantity, incoterm } = order;

    return (
        <Card className={classes.card}>
            <Grid
                container
            >
                <Grid item xs={9}>
                    <Typography className={classes.status}>{status}</Typography>
                    <Typography className={classes.poRef}>{orderNumber}</Typography>
                    <div className={classes.info}>
                        <Typography className={classes.title}>{`${dateTitle}:`}&nbsp;</Typography>
                        <Typography className={classes.value}>{yymmddToLocaleDate(orderDate)}</Typography>
                    </div>
                    <div className={classes.info}>
                        <Typography className={classes.title}>{`${crdTitle}:`}&nbsp;</Typography>
                        <Typography className={classes.value}>{yymmddToLocaleDate(cargoReadyDay)}</Typography>
                    </div>
                    <div className={classes.info}>
                        <Typography className={classes.title}>{`${quantityTitle}:`}&nbsp;</Typography>
                        <Typography className={classes.value}>
                            {getStringFromTotalQuantityObject(totalQuantity)}
                        </Typography>
                    </div>
                    <div className={classes.info}>
                        <Typography className={classes.title}>{`${incotermTitle}:`}&nbsp;</Typography>
                        <Typography className={classes.value}>
                            {incoterm}
                        </Typography>
                    </div>
                </Grid>
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="flex-end"
                    xs
                >
                    <Button><DeleteIcon/></Button>
                    <Button variant="outlined">{editButton}</Button>
                </Grid>
            </Grid>
        </Card>
    )
}