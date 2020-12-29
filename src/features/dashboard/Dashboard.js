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
import { LANGUAGE, LOCALE } from '../../app/utils/constants.js';
import {
    selectNewOrders,
    selectInProdOrders,
    selectInQAOrders,
    selectInProcOrders,
    selectOrderCountData,
    selectOrderRevData,
    selectWithException,
    selectNewLeadsCount,
    selectWIPLeadsCount,
    selectCompletedCount,
    selectNewClients,
    selectTotClients,
} from './duck/selectors';

const {
    ordersStats,
    orderCountGraph,
    orderRevenueGraph,
    leads,
    clients,
    crdStats,
} = LANGUAGE.dashboard;

const testMetricShort = [
    {
        metricId: 'Placeholder',
        value: 20,
    },
    {
        metricId: 'Ciao',
        value: 5,
    },
];

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

const optionsRevGraph = {
    scales: {
        yAxes: [
            {
                stacked: true,
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
        xAxes: [
            {
                stacked: true,
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
    const newLeads = useSelector(selectNewLeadsCount);
    const wipLeads = useSelector(selectWIPLeadsCount);
    const completedOrders = useSelector(selectCompletedCount);
    const newClients = useSelector(selectNewClients);
    const totClients = useSelector(selectTotClients);

    const orderMetrics = [
        {
            metricId: ordersStats.new,
            value: newOrders,
        },
        {
            metricId: ordersStats.inProcurement,
            value: inProc,
        },
        {
            metricId: ordersStats.inProduction,
            value: inProd,
        },
        {
            metricId: ordersStats.inQA,
            value: inQA,
        },
    ];

    const orderAccentCompleted = {
        metricId: 'Completed',
        value: completedOrders,
    };

    const leadsMetrics = [
        {
            metricId: leads.newLeads,
            value: newLeads,
        },
        {
            metricId: leads.wipLeads,
            value: wipLeads,
        },
    ];

    const clientMetrics = [
        {
            metricId: 'New Clients',
            value: newClients,
        },
        {
            metricId: 'Total Clients',
            value: totClients,
        },
    ];

    const exceptionMetric = {
        metricId: ordersStats.exception,
        value: withException,
    };

    const orderCounts = {
        labels: Object.keys(orderCountData).reverse(),
        datasets: [
            {
                label: orderCountGraph.title,
                data: Object.values(orderCountData).reverse(),
                fill: false,
                backgroundColor: 'rgb(16, 156, 241)',
                borderColor: 'rgba(16, 156, 241, 0.2)',
            },
        ],
    };

    const orderRev = {
        labels: Object.keys(orderRevData.labels).reverse(),
        datasets: [
            {
                label: 'CNY',
                data: Object.values(orderRevData.cny).reverse(),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'EUR',
                data: Object.values(orderRevData.eur).reverse(),
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
            },
            {
                label: 'USD',
                data: Object.values(orderRevData.usd).reverse(),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
            },
        ],
    };

    const classes = useStyles();
    return (
        <Grid container direction="column">
            <Grid item>
                <Typography className={classes.title} variant="h4">
                    Dashboard
                </Typography>
            </Grid>

            <Grid item>
                <MetricCard
                    titleLabel={ordersStats.title}
                    metrics={orderMetrics}
                    accentMetric={orderAccentCompleted}
                    dangerMetric={exceptionMetric}
                />
            </Grid>

            <Grid container item>
                <Grid xs={12} md={6} item className={classes.graph}>
                    <Line
                        data={orderCounts}
                        width={50}
                        height={30}
                        options={optionsOrderCount}
                    />
                </Grid>
                <Grid xs={12} md={6} item className={classes.graph}>
                    <Bar
                        data={orderRev}
                        width={50}
                        height={30}
                        options={optionsRevGraph}
                    />
                </Grid>
            </Grid>

            <Grid container item>
                <Grid xs={12} md={4} item>
                    <MetricCard
                        titleLabel={leads.title}
                        metrics={leadsMetrics}
                    />
                </Grid>

                <Grid xs={12} md={4} item>
                    <MetricCard
                        titleLabel={clients.title}
                        metrics={clientMetrics}
                    />
                </Grid>
                <Grid xs={12} md={4} item>
                    <MetricCard
                        titleLabel={crdStats.title}
                        metrics={testMetricShort}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
});

export default Dashboard;
