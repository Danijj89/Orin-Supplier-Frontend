import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Typography, Divider, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        minHeight: 160,
        margin: theme.spacing(5),
    },
    display: {
        flexGrow: 1,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    title: {
        fontWeight: 'bold',
        paddingTop: '12px',
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    number: {
        fontWeight: 'bold',
        paddingTop: '18px',
    },
    sucessAccent: {
        color: theme.palette.success.main,
        fontWeight: 'bold',
        paddingTop: '18px',
    },
    dangerAccent: {
        color: theme.palette.warning.main,
        fontWeight: 'bold',
        paddingTop: '18px',
    },
    metric: {
        margin: theme.spacing(1),
    },
    dialog: {
        width: theme.spacing(80),
        height: theme.spacing(30),
        [theme.breakpoints.down('md')]: {
            width: theme.spacing(50),
            height: theme.spacing(30),
        },
        [theme.breakpoints.down('xs')]: {
            width: theme.spacing(30),
            height: theme.spacing(30),
        },
    },
    divider: {
        height: '50px',
    },
}));

const MetricsCard = React.memo(function MetricsCard({
    titleLabel,
    metrics,
    dangerMetric,
    accentMetric,
    className,
}) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Card className={clsx(classes.container, className)}>
            <Typography variant="h6" className={classes.title}>
                {titleLabel}
            </Typography>
            <Divider />
            <Grid container justify="space-around" alignItems="center">
                {metrics.map((metric) => (
                    <Grid className={classes.metric} item key={metric.metricId}>
                        <Link onClick={() => history.push(metric.filter)}>
                        <Typography
                            variant={'h3'}
                            align="center"
                            color="primary"
                            className={classes.number}
                        >
                            {metric.value}
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                            {metric.metricId}
                        </Typography>
                        </Link>
                    </Grid>
                ))}
                {dangerMetric && (
                    <Grid className={classes.metric} item>
                        <Typography
                            variant={'h3'}
                            align="center"
                            className={classes.dangerAccent}
                        >
                            {dangerMetric.value}
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                            {dangerMetric.metricId}
                        </Typography>
                    </Grid>
                )}

                {accentMetric && (
                    <Divider
                        orientation="vertical"
                        className={classes.divider}
                        variant="middle"
                    />
                )}

                {accentMetric && (
                    <Grid className={classes.metric} item>
                        <Typography
                            variant={'h3'}
                            align="center"
                            className={classes.sucessAccent}
                        >
                            {accentMetric.value}
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                            {accentMetric.metricId}
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Card>
    );
});

MetricsCard.propTypes = {
    titleLabel: PropTypes.string.isRequired,
    metrics: PropTypes.array,
    accentMetric: PropTypes.object,
    dangerMetric: PropTypes.object,
    className: PropTypes.string,
};

export default MetricsCard;
