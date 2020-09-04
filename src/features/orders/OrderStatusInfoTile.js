import React from 'react';
import {
    Grid,
    Typography,
    Card,
    Divider,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { makeStyles } from '@material-ui/core/styles';
import StatusTooltip from '../shared/displays/StatusTooltip.js';
import { yymmddToLocaleDate } from '../shared/utils.js';

const { title, editButton, headers, rowLabels } = LANGUAGE.order.orderStatusInfoTile;

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2),
        height: 260,
        minHeight: 240
    },
    titleRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    title: {
        color: theme.palette.tertiary['700'],
        fontWeight: 'bold'
    },
    column1: {
        color: theme.palette.tertiary['600'],
        borderBottom: 'none'
    },
    edit: {
        width: '10%',
        minWidth: 50,
        height: '80%'
    },
    tableContainer: {
        padding: theme.spacing(2)
    },
    header: {
        color: theme.palette.tertiary['700'],
        fontWeight: 'bold',
        borderBottom: 'none'
    },
    date: {
        fontSize: '0.8rem',
        borderBottom: 'none'
    },
    tooltip: {
        borderBottom: 'none'
    }
}));

export default function OrderStatusInfoTile({ status }) {
    const classes = useStyles();
    const { procurement, production, qa } = status;

    const BorderLessHeaderCell = ({ header }) =>
        <TableCell align="center" classes={ { root: classes.header } }>
            { header }
        </TableCell>

    const BorderLessRowTitleCell = ({ label }) =>
        <TableCell align="left" className={ classes.column1 }>
            { label }
        </TableCell>

    const BorderLessTooltipCell = ({ status }) =>
        <TableCell align="center" className={classes.tooltip}>
            <StatusTooltip status={ status }/>
        </TableCell>

    const BorderLessCell = ({ value }) =>
        <TableCell align="center" className={ classes.date }>
            { getDateRep(value) }
        </TableCell>

    const getDateRep = (val) => {
        if (val) return yymmddToLocaleDate(val);
        return yymmddToLocaleDate(Date.now());
    }

    return (
        <Card className={ classes.card } elevation={3}>
            <Grid container>
                <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    item xs={ 12 }
                    className={ classes.titleRow }
                >
                    <Typography variant="h5" className={ classes.title }>{ title }</Typography>
                    <ThemedButton variant="outlined" text={ editButton } styles={ classes.edit }/>
                </Grid>
                <Grid item xs={ 12 }>
                    <Divider/>
                </Grid>
                <Grid item xs={ 12 } className={ classes.tableContainer }>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <BorderLessHeaderCell/>
                                    { headers.map((header, index) =>
                                        <BorderLessHeaderCell key={ index } header={ header }/>) }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <BorderLessRowTitleCell label={ rowLabels[0] }/>
                                    <BorderLessTooltipCell status={ procurement.status }/>
                                    <BorderLessTooltipCell status={ production.status }/>
                                    <BorderLessTooltipCell status={ qa.status }/>
                                </TableRow>
                                <TableRow>
                                    <BorderLessRowTitleCell label={ rowLabels[1] }/>
                                    <BorderLessCell value={ procurement.estimated }/>
                                    <BorderLessCell value={ production.estimated }/>
                                    <BorderLessCell value={ qa.estimated }/>
                                </TableRow>
                                <TableRow>
                                    <BorderLessRowTitleCell label={rowLabels[2]} />
                                    <BorderLessCell value={ procurement.actual }/>
                                    <BorderLessCell value={ production.actual }/>
                                    <BorderLessCell value={ qa.actual }/>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Card>
    )
}