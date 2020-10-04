import React from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';

export default function ColumnInfoDisplay({ leftLabels, leftData, rightLabels, rightData }) {

    return (
        <Grid container>
            <Grid container item xs={6}>
                <Grid container direction="column" alignItems="flex-end" item xs={5}>
                    {leftLabels.map(label => <Typography>{label}</Typography>)}
                </Grid>
                <Grid container item justify="center" xs={2}>
                    <Divider orientation="vertical" flexItem/>
                </Grid>
                <Grid container direction="column" alignItems="flex-start" item xs={5}>
                    {leftData.map(data => <Typography>{data}</Typography>)}
                </Grid>
            </Grid>
            <Grid container item xs={6}>
                <Grid container direction="column" alignItems="flex-end" item xs={5}>
                    {rightLabels.map(label => <Typography>{label}</Typography>)}
                </Grid>
                <Grid container item justify="center" xs={2}>
                    <Divider orientation="vertical" flexItem/>
                </Grid>
                <Grid container direction="column" alignItems="flex-start" item xs={5}>
                    {rightData.map(data => <Typography>{data}</Typography>)}
                </Grid>
            </Grid>
        </Grid>
    )
}