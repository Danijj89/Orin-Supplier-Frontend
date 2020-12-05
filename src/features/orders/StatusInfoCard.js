import React from 'react';
import { LANGUAGE } from '../../app/utils/constants.js';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { dateToLocaleDate } from '../shared/utils/format.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { Table, TableContainer, TableHead, TableRow, TableCell as MuiTableCell, TableBody } from '@material-ui/core';
import StatusDisplay from './StatusDisplay.js';
import EditOrderStatusButton from './EditOrderStatusButton.js';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectOrderById } from './duck/selectors.js';

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
} = LANGUAGE.order.order.orderDetails.statusInfoCard;

const TableCell = withStyles((theme) => ({
    root: {
        borderBottom: 'none',
        padding: theme.spacing(1)
    },
}))(MuiTableCell);


const StatusInfoCard = React.memo(function StatusInfoCard() {
    const classes = useStyles();
    const { id: orderId } = useParams();
    const order = useSelector(state => selectOrderById(state, { orderId }));
    const { procurement, production, qa } = order;

    const HeaderCell = ({ header }) =>
        <TableCell align="center" width={ 140 }>{ header }</TableCell>

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
            button={
                <EditOrderStatusButton
                    orderId={ orderId }
                    procurement={ order.procurement }
                    production={ order.production }
                    qa={ order.qa }
                />
            }
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
});

export default StatusInfoCard;
