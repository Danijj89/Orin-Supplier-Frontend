import React from 'react';
import {Grid, Box, Typography} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    box: {
        marginLeft: theme.spacing(0.5)
    },
    totals: {
        marginTop: theme.spacing(1)
    },
}));



export function GenerateCITotal(quantity, total, currency) {
    const classes = useStyles();
    let totals = []
    let quantityString = ""
    for (const [key, value] of Object.entries(quantity)) {
        quantityString += `${key}: ${value} `
    }
    totals.push(
        <Grid container key={'totals'} className={classes.totals}>
            <Grid item xs={6}></Grid>
            <Grid item xs={1}>
                <Box fontWeight="fontWeightBold">
                    <Typography className={classes.box} variant="subtitle2">
                        Total
                    </Typography></Box>
            </Grid>
            <Grid item xs={2}>
                <Box fontWeight="fontWeightBold">
                    <Typography className={classes.box} variant="subtitle2">
                        {quantityString}
                    </Typography></Box>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
                <Box fontWeight="fontWeightBold">
                    <Typography className={classes.box} variant="subtitle2">
                        {currency.symbol + ' ' + total}
                    </Typography></Box>
            </Grid>
        </Grid>
    )

    return <Grid>{totals}</Grid>
}

export function GeneratePLTotal(quantity, netWeight, grossWeight, dimension) {
    const classes = useStyles();
    let totals = []
    let quantityString = ""
    for (const [key, value] of Object.entries(quantity)) {
        quantityString += `${key}: ${value} `
    }
    totals.push(
        <Grid container key={'totals'} className={classes.totals}>
            <Grid item xs={6}></Grid>
            <Grid item xs={2}>
                <Box fontWeight="fontWeightBold">
                    <Typography className={classes.box} variant="subtitle2">
                        {'Total: ' + quantityString}
                    </Typography></Box>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}>
                <Box fontWeight="fontWeightBold">
                    <Typography className={classes.box} variant="subtitle2">
                        {netWeight + 'kg'}
                    </Typography></Box>
            </Grid>
            <Grid item xs={1}>
                <Box fontWeight="fontWeightBold">
                    <Typography className={classes.box} variant="subtitle2">
                        {grossWeight + 'kg'}
                    </Typography></Box>
            </Grid>
            <Grid item xs={1}>
                <Box fontWeight="fontWeightBold">
                    <Typography className={classes.box} variant="subtitle2">
                        {dimension + 'cbm'}
                    </Typography></Box>
            </Grid>
        </Grid>
    )

    return <Grid>{totals}</Grid>
}
