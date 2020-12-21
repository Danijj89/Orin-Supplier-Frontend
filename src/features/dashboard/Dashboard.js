import React, { lazy } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Paper, Box, Typography, Divider } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Route from '../shared/components/AppRoute.js';
import { Switch, Redirect } from 'react-router-dom';
import Suspense from '../shared/components/Suspense.js';
import MetricCard from './MetricsCard';
import { Bar, Line } from 'react-chartjs-2';

const testMetric = [
    {
        metricId: 'New Order',
        value: 20,
    },
    {
        metricId: 'procurement',
        value: 5,
    },
    {
        metricId: 'production',
        value: 12,
    },
];

const testMetricShort = [
    {
        metricId: 'New Order',
        value: 20,
    },
    {
        metricId: 'procurement',
        value: 5,
    },
];

const testAccentMetric = {
    metricId: 'completed',
    timeFrame: 7,
    value: 15,
};

const testDangerAccentMetric = {
    metricId: 'exception',
    timeFrame: 7,
    value: 3,
};

const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
        {
            label: 'Orders #',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'rgb(16, 156, 241)',
            borderColor: 'rgba(16, 156, 241, 0.2)',
        },
    ],
};

const options = {
    maintainAspectRatio: false,
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const useStyles = makeStyles((theme) => ({
    graph: {
        padding: theme.spacing(5),
    },
    title: {
        paddingLeft: theme.spacing(5),
    },
}));

const Dashboard = React.memo(function Dashboard() {
    const classes = useStyles();
    return (
        <Grid container direction="column">
            <Grid item>
                <Typography className={classes.title} variant="h4">
                    Dashboard is alive!
                </Typography>
            </Grid>

            <Grid item>
                <MetricCard
                    titleLabel={'Orders'}
                    metrics={testMetric}
                    accentMetric={testAccentMetric}
                    dangerMetric={testDangerAccentMetric}
                />
            </Grid>

            <Grid container item>
                <Grid xs={12} md={6} item className={classes.graph}>
                    <Bar
                        data={data}
                        width={50}
                        height={200}
                        options={options}
                    />
                </Grid>
                <Grid xs={12} md={6} item className={classes.graph}>
                    <Line
                        data={data}
                        width={50}
                        height={200}
                        options={options}
                    />
                </Grid>
            </Grid>

            <Grid container item>
                <Grid xs={12} md={6} item>
                    <MetricCard
                        titleLabel={'Leads'}
                        metrics={testMetricShort}
                        accentMetric={testAccentMetric}
                    />
                </Grid>

                <Grid xs={12} md={3} item>
                    <MetricCard
                        titleLabel={'Clients'}
                        metrics={testMetricShort}
                    />
                </Grid>
                <Grid xs={12} md={3} item>
                    <MetricCard
                        titleLabel={'Cargo Ready'}
                        metrics={testMetricShort}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
});

export default Dashboard;
