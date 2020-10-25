import React, { useEffect, useState } from 'react';
import { LANGUAGE } from '../../app/constants.js';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { dateToLocaleDate } from '../shared/utils/format.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { Table, TableContainer, TableHead, TableRow, TableCell as MuiTableCell, TableBody } from '@material-ui/core';
import StatusDisplay from './StatusDisplay.js';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        padding: theme.spacing(2),
    },
    label: {
        width: 160,
        fontWeight: 'bold',
        color: theme.palette.grey.main,
        fontSize: '1rem'
    }
}));

const {
    title,
    headerLabelsMap,
    statusLabel,
    estimatedLabel,
    actualLabel
} = LANGUAGE.order.order.orderInfoCards.statusInfoCard;

const TableCell = withStyles((theme) => ({
    root: {
        borderBottom: 'none',
        padding: theme.spacing(1)
    },
}))(MuiTableCell);


export default function StatusInfoCard({ orderId, status }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { register, setValue, watch, handleSubmit, getValues } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            procurement: status.procurement,
            production: status.production,
            qa: status.qa,
        },
        shouldUnregister: false
    });

    useEffect(() => {
        register({ name: 'procurement' }, { required: true });
        register({ name: 'production' }, { required: true });
        register({ name: 'qa' }, { required: true });
    }, [register]);

    const procurement = watch('procurement');
    const production = watch('production');
    const qa = watch('qa');

    const HeaderCell = ({ header }) =>
        <TableCell align="center">{ header }</TableCell>

    const LabelCell = ({ label }) =>
        <TableCell className={ classes.label }>{ label }</TableCell>

    const StatusCell = ({ status }) =>
        <TableCell align="center">
            <StatusDisplay status={ status }/>
        </TableCell>

    const DateCell = ({ date }) =>
        <TableCell align="center">{ date ? dateToLocaleDate(date) : '-' }</TableCell>

    return (
        <InfoCard
            title={ title }
            content={
                <TableContainer className={ classes.tableContainer }>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <HeaderCell header={ headerLabelsMap.procurement }/>
                                <HeaderCell header={ headerLabelsMap.production }/>
                                <HeaderCell header={ headerLabelsMap.qa }/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <LabelCell label={ statusLabel }/>
                                <StatusCell status={ procurement.status }/>
                                <StatusCell status={ production.status }/>
                                <StatusCell status={ qa.status }/>
                            </TableRow>
                            <TableRow>
                                <LabelCell label={ estimatedLabel }/>
                                <DateCell date={ procurement.estimated }/>
                                <DateCell date={ production.estimated }/>
                                <DateCell date={ qa.estimated }/>
                            </TableRow>
                            <TableRow>
                                <LabelCell label={ actualLabel }/>
                                <DateCell date={ procurement.actual }/>
                                <DateCell date={ production.actual }/>
                                <DateCell date={ qa.actual }/>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        />
    );
}
