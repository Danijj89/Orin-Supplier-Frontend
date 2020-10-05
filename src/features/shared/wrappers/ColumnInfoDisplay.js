import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Typography } from '@material-ui/core';

export default function ColumnInfoDisplay({ leftLabels = [], leftData = [], rightLabels = [], rightData = [] }) {

    return (
        <Grid container>
            <Grid container item xs={6}>
                <Grid container direction="column" alignItems="flex-end" item xs={5}>
                    {leftLabels.map((label, i) => <Typography key={i}>{label}</Typography>)}
                </Grid>
                <Grid container item justify="center" xs={2}>
                    <Divider orientation="vertical" flexItem/>
                </Grid>
                <Grid container direction="column" alignItems="flex-start" item xs={5}>
                    {leftData.map((data, i) => <Typography key={i}>{data}</Typography>)}
                </Grid>
            </Grid>
            <Grid container item xs={6}>
                <Grid container direction="column" alignItems="flex-end" item xs={5}>
                    {rightLabels.map((label, i) => <Typography key={i}>{label}</Typography>)}
                </Grid>
                <Grid container item justify="center" xs={2}>
                    <Divider orientation="vertical" flexItem/>
                </Grid>
                <Grid container direction="column" alignItems="flex-start" item xs={5}>
                    {rightData.map((data, i) => <Typography key={i}>{data}</Typography>)}
                </Grid>
            </Grid>
        </Grid>
    )
}

ColumnInfoDisplay.propTypes = {
    leftLabels: PropTypes.array,
    rightLabels: PropTypes.array,
    leftData: PropTypes.array,
    rightData: PropTypes.array,
};