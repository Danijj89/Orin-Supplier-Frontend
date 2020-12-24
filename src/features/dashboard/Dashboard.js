import React, { lazy } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Paper, Box, Typography, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Route from '../shared/components/AppRoute.js';
import { Switch, Redirect } from 'react-router-dom';
import Suspense from '../shared/components/Suspense.js';
import MetricCard from './MetricsCard';
import { Bar, Line } from 'react-chartjs-2';
import {
    selectNewOrders,
    selectInProdOrders,
    selectInQAOrders,
    selectInProcOrders,
    selectOrderCountData,
    selectOrderRevData,
    selectWithException,
} from './duck/selectors';

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

const optionsOrderCount = {
    maintainAspectRatio: false,
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                    stepSize: 1,
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
    const newOrders = useSelector(selectNewOrders);
    const inProc = useSelector(selectInProcOrders);
    const inProd = useSelector(selectInProdOrders);
    const inQA = useSelector(selectInQAOrders);
    const withException = useSelector(selectWithException);
    const orderCountData = useSelector(selectOrderCountData);
    const orderRevData = useSelector(selectOrderRevData);

    const orderMetrics = [
        {
            metricId: 'New Order',
            value: newOrders,
        },
        {
            metricId: 'procurement',
            value: inProc,
        },
        {
            metricId: 'production',
            value: inProd,
        },
        {
            metricId: 'QA',
            value: inQA,
        },
    ];

    const exceptionMetric = {
        metricId: 'exception',
        value: withException,
    };

    const orderCounts = {
        labels: Object.keys(orderCountData).reverse(),
        datasets: [
            {
                label: 'Orders #',
                data: Object.values(orderCountData).reverse(),
                fill: false,
                backgroundColor: 'rgb(16, 156, 241)',
                borderColor: 'rgba(16, 156, 241, 0.2)',
            },
        ],
    };

    const orderRev = {
        labels: Object.keys(orderRevData).reverse(),
        datasets: [
            {
                label: 'Orders Revenue',
                data: Object.values(orderRevData).reverse(),
                fill: false,
                backgroundColor: 'rgb(16, 156, 241)',
                borderColor: 'rgba(16, 156, 241, 0.2)',
            },
        ],
    };

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
                    metrics={orderMetrics}
                    accentMetric={testAccentMetric}
                    dangerMetric={exceptionMetric}
                />
            </Grid>

            <Grid container item>
                <Grid xs={12} md={6} item className={classes.graph}>
                    <Bar
                        data={orderCounts}
                        width={50}
                        height={200}
                        options={optionsOrderCount}
                    />
                </Grid>
                <Grid xs={12} md={6} item className={classes.graph}>
                    <Line
                        data={orderRev}
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
