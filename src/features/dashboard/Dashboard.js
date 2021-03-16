import React, { useMemo } from 'react';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MetricCard from './MetricsCard';
import { Bar, Line } from 'react-chartjs-2';
import { LANGUAGE } from 'app/utils/constants.js';
import {
    selectDashboardData,
} from './duck/selectors';
import { getOrderTableURL } from "../orders/utils/urls";
import { getLeadsTableURL } from "../leads/utils/urls";

const {
    dashboard,
    ordersStats,
    orderCountGraph,
    orderRevenueGraph,
    leads,
    clients,
    // crdStats,
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
    const classes = useStyles();
    const dashboardData = useSelector(selectDashboardData);
    const newOrderUrl = useMemo(() => getOrderTableURL(
        [{field: "procurement", value: "Not+Started"}, {field: "production", value: "Not+Started"}, {
            field: "qa",
            value: "Not+Started"
        }]
    ), [])

    const inProcOrderUrl = useMemo(() => getOrderTableURL(
        [{field: "procurement", value: "In+Progress"},]
    ), [])

    const inProdOrderUrl = useMemo(() => getOrderTableURL(
        [{field: "production", value: "In+Progress"},]
    ), [])

    const inQaOrderUrl = useMemo(() => getOrderTableURL(
        [{field: "qa", value: "In+Progress"},]
    ), [])

    const newLeadsUrl = useMemo(() => getLeadsTableURL(
        [{field: "salesStatus", value: "1"}]
    ), [])

    const workingLeadsUrl = useMemo(() => getLeadsTableURL(
        [{field: "salesStatus", value: "2"}]
    ), [])

    const blockedLeadsUrl = useMemo(() => getLeadsTableURL(
        [{field: "salesStatus", value: "4"}]
    ), [])

    const orderMetrics = useMemo(() => [
        {
            metricId: ordersStats.new,
            value: dashboardData.newOrders,
            filter: newOrderUrl,
        },
        {
            metricId: ordersStats.inProcurement,
            value: dashboardData.inProc,
            filter: inProcOrderUrl
        },
        {
            metricId: ordersStats.inProduction,
            value: dashboardData.inProd,
            filter: inProdOrderUrl
        },
        {
            metricId: ordersStats.inQA,
            value: dashboardData.inQA,
            filter: inQaOrderUrl
        },
    ], [dashboardData.newOrders, dashboardData.inProc, dashboardData.inProd, dashboardData.inQA, inProcOrderUrl, inProdOrderUrl, inQaOrderUrl, newOrderUrl]);

    const orderAccentCompleted = useMemo(() => {
        return {
            metricId: ordersStats.completed,
            value: dashboardData.completedOrders,
        }
    }, [dashboardData.completedOrders]);

    const orderExceptionMetric = useMemo(() => {
        return {
            metricId: ordersStats.exception,
            value: dashboardData.withException,
        }
    }, [dashboardData.withException]);

    const leadsExceptionMetric = useMemo(() => {
        return {
            metricId: leads.blockedLeads,
            value: dashboardData.blockedLeads,
            filter: blockedLeadsUrl
        }
    }, [dashboardData.blockedLeads, blockedLeadsUrl]);

    const leadsMetrics = useMemo(() => [
        {
            metricId: leads.newLeads,
            value: dashboardData.newLeadsCount,
            filter: newLeadsUrl
        },
        {
            metricId: leads.wipLeads,
            value: dashboardData.wipLeads,
            filter: workingLeadsUrl
        },
    ], [dashboardData.newLeadsCount, dashboardData.wipLeads, newLeadsUrl, workingLeadsUrl]);


    const clientMetrics = useMemo(() => [
        {
            metricId: clients.newClients,
            value: dashboardData.newClients,
        },
    ], [dashboardData.newClients]);

    const clientAccentAll = useMemo(() => {
        return {
            metricId: clients.totClients,
            value: dashboardData.totClients,
        }
    }, [dashboardData.totClients]);


    // const crdMetrics = [
    //     {
    //         metricId: crdStats.crdOT,
    //         value: 10,
    //         // value: (crdPerf.toFixed(2) * 100).toString() + '%',
    //     },
    //     {
    //         metricId: crdStats.crdDiff,
    //         value: 5,
    //         // value: crdDiff,
    //     },
    // ];

    const orderCounts = {
        labels: Object.keys(dashboardData.newOrdersByDay).reverse(),
        datasets: [
            {
                label: orderCountGraph.title,
                data: Object.values(dashboardData.newOrdersByDay).reverse(),
                fill: false,
                backgroundColor: 'rgb(16, 156, 241)',
                borderColor: 'rgba(16, 156, 241, 0.2)',
            },
        ],
    };

    const orderRev = {
        labels: Object.values(dashboardData.revenueByDay.labels).reverse(),
        datasets: [
            {
                label: orderRevenueGraph.cny,
                data: Object.values(dashboardData.revenueByDay.cny).reverse(),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: orderRevenueGraph.eur,
                data: Object.values(dashboardData.revenueByDay.eur).reverse(),
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
            },
            {
                label: orderRevenueGraph.usd,
                data: Object.values(dashboardData.revenueByDay.usd).reverse(),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
            },
        ],
    };


    return (
        <Grid container direction="column">
            <Grid item>
                <Typography className={ classes.title } variant="h4">
                    { dashboard.title }
                </Typography>
            </Grid>

            <Grid item>
                <MetricCard
                    titleLabel={ ordersStats.title }
                    metrics={ orderMetrics }
                    accentMetric={ orderAccentCompleted }
                    dangerMetric={ orderExceptionMetric }
                />
            </Grid>

            <Grid container item>
                <Grid xs={ 12 } md={ 6 } item className={ classes.graph }>
                    <Line
                        data={ orderCounts }
                        width={ 40 }
                        height={ 15 }
                        options={ optionsOrderCount }
                    />
                </Grid>
                <Grid xs={ 12 } md={ 6 } item className={ classes.graph }>
                    <Bar
                        data={ orderRev }
                        width={ 40 }
                        height={ 15 }
                        options={ optionsRevGraph }
                    />
                </Grid>
            </Grid>

            <Grid container item>
                <Grid xs={ 12 } md={ 6 } item>
                    <MetricCard
                        titleLabel={ leads.title }
                        metrics={ leadsMetrics }
                        dangerMetric={ leadsExceptionMetric }
                    />
                </Grid>

                <Grid xs={ 12 } md={ 6 } item>
                    <MetricCard
                        titleLabel={ clients.title }
                        metrics={ clientMetrics }
                        accentMetric={ clientAccentAll }
                    />
                </Grid>
                {/* <Grid xs={12} md={4} item>
                    <MetricCard
                        titleLabel={crdStats.title}
                        metrics={crdMetrics}
                    />
                </Grid> */ }
            </Grid>
        </Grid>
    );
});

export default Dashboard;
