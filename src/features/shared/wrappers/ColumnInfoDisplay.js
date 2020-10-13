import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    labels: {
        marginTop: theme.spacing(0.3),
        marginBottom: theme.spacing(0.2),
        fontWeight: 'bold',
    },

    content: {
        marginTop: theme.spacing(0.2),
        marginBottom: theme.spacing(0.2),
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
}));

export default function ColumnInfoDisplay({
    leftLabels = [],
    leftData = [],
    rightLabels = [],
    rightData = [],
}) {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid container className={classes.container} item xs={12} md={6}>
                <Grid
                    container
                    direction="column"
                    alignItems="flex-end"
                    item
                    xs={5}
                >
                    {leftLabels.map((label, i) => (
                        <Typography className={classes.labels} key={i}>
                            {label}
                        </Typography>
                    ))}
                </Grid>
                <Grid container item justify="center" xs={2}>
                    <Divider orientation="vertical" flexItem />
                </Grid>
                <Grid
                    container
                    direction="column"
                    alignItems="flex-start"
                    item
                    xs={5}
                >
                    {leftData.map((data, i) => (
                        <Typography className={classes.content} key={i}>
                            {data}
                        </Typography>
                    ))}
                </Grid>
            </Grid>
            <Grid container className={classes.container} item xs={12} md={6}>
                <Grid
                    container
                    direction="column"
                    alignItems="flex-end"
                    item
                    xs={5}
                >
                    {rightLabels.map((label, i) => (
                        <Typography className={classes.labels} key={i}>
                            {label}
                        </Typography>
                    ))}
                </Grid>
                <Grid container item justify="center" xs={2}>
                    <Divider orientation="vertical" flexItem />
                </Grid>
                <Grid
                    container
                    direction="column"
                    alignItems="flex-start"
                    item
                    xs={5}
                >
                    {rightData.map((data, i) => (
                        <Typography className={classes.content} key={i}>
                            {data}
                        </Typography>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

ColumnInfoDisplay.propTypes = {
    leftLabels: PropTypes.array,
    rightLabels: PropTypes.array,
    leftData: PropTypes.array,
    rightData: PropTypes.array,
};
