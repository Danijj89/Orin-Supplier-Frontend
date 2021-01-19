import React from 'react';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MetricCard from './MetricsCard';
import { Bar, Line } from 'react-chartjs-2';
import { LANGUAGE } from '../../app/utils/constants.js';
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
    selectCrdDiff,
    selectCrdPerf,
} from './duck/selectors';

const {
    dashboard,
    ordersStats,
    orderCountGraph,
    orderRevenueGraph,
    leads,
    clients,
    crdStats,
} = LANGUAGE.dashboard;

const optionsOrderCount = {
    maintainAspectRatio: true,
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
    // const crdPerf = useSelector(selectCrdPerf);
    // const crdDiff = useSelector(selectCrdDiff);

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
        metricId: ordersStats.completed,
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
            metricId: clients.newClients,
            value: newClients,
        },
        {
            metricId: clients.totClients,
            value: totClients,
        },
    ];

    const exceptionMetric = {
        metricId: ordersStats.exception,
        value: withException,
    };

    const crdMetrics = [
        {
            metricId: crdStats.crdOT,
            value: 10,
            // value: (crdPerf.toFixed(2) * 100).toString() + '%',
        },
        {
            metricId: crdStats.crdDiff,
            value: 5,
            // value: crdDiff,
        },
    ];

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
        labels: Object.values(orderRevData.labels).reverse(),
        datasets: [
            {
                label: orderRevenueGraph.cny,
                data: Object.values(orderRevData.cny).reverse(),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: orderRevenueGraph.eur,
                data: Object.values(orderRevData.eur).reverse(),
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
            },
            {
                label: orderRevenueGraph.usd,
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
                    {dashboard.title}
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
                <Grid xs={12} md={6} item>
                    <MetricCard
                        titleLabel={leads.title}
                        metrics={leadsMetrics}
                    />
                </Grid>

                <Grid xs={12} md={6} item>
                    <MetricCard
                        titleLabel={clients.title}
                        metrics={clientMetrics}
                    />
                </Grid>
                {/* <Grid xs={12} md={4} item>
                    <MetricCard
                        titleLabel={crdStats.title}
                        metrics={crdMetrics}
                    />
                </Grid> */}
            </Grid>
        </Grid>
    );
});

export default Dashboard;
