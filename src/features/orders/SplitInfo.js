import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles.js';
import { TableCell as MuiTableCell } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import OrderStatusDisplay from 'features/orders/OrderStatusDisplay.js';
import { dateToLocaleDate } from 'features/shared/utils/format.js';
import { LANGUAGE } from 'app/utils/constants.js';
import OrderStatusPermission from 'features/shared/permissions/OrderStatusPermission.js';
import { READ_ANY, READ_OWN } from 'features/admin/utils/actions.js';
import EditOrderStatusButton from 'features/orders/EditOrderStatusButton.js';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextAreaCard from 'features/shared/components/TextAreaCard.js';
import { useDispatch } from 'react-redux';
import { updateSplit } from 'features/orders/duck/thunks.js';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2)
    },
    label: {
        width: 160,
        fontWeight: 'bold',
        color: theme.palette.grey.main,
        fontSize: '1rem'
    }
}));

const TableCell = withStyles(theme => ({
    root: {
        borderBottom: 'none',
        padding: theme.spacing(1)
    },
}))(MuiTableCell);

const HeaderCell = React.memo(function HeaderCell({ header }) {
    return (
        <TableCell align="center" width={ 140 }>{ header }</TableCell>
    );
});

const LabelCell = React.memo(function LabelCell({ label }) {
    const classes = useStyles();
    return (
        <TableCell className={ classes.label }>{ label }</TableCell>
    );
});

const StatusCell = React.memo(function StatusCell({ status }) {
    return (
        <TableCell align="center">
            <OrderStatusDisplay status={ status }/>
        </TableCell>
    );
});

const DateCell = React.memo(function DateCell({ date }) {
    return (
        <TableCell align="center">{ date ? dateToLocaleDate(date) : '-' }</TableCell>
    );
});

const {
    tableHeaderLabels,
    titles,
    labels
} = LANGUAGE.order.order;

const SplitInfo = React.memo(function SplitInfo({ orderId, split }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { _id: splitId, procurement, production, qa, notes } = split;

    const onNotesSubmit = useCallback(
        notes => dispatch(updateSplit({ orderId, splitId, update: { notes } })),
        [dispatch, orderId, splitId]);

    return (
        <OrderStatusPermission action={ [READ_ANY, READ_OWN] } orderId={ orderId }>
            <Grid className={ classes.container } container>
                <Grid container justify="space-between" item xs={ 12 }>
                    <Typography variant="h6">{ titles.splitStatus }</Typography>
                    <EditOrderStatusButton
                        orderId={ orderId }
                        splitId={ splitId }
                        procurement={ procurement }
                        production={ production }
                        qa={ qa }
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell/>
                                    <HeaderCell header={ tableHeaderLabels.procurement }/>
                                    <HeaderCell header={ tableHeaderLabels.production }/>
                                    <HeaderCell header={ tableHeaderLabels.qa }/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <LabelCell label={ labels.status }/>
                                    <StatusCell status={ procurement.status }/>
                                    <StatusCell status={ production.status }/>
                                    <StatusCell status={ qa.status }/>
                                </TableRow>
                                <TableRow>
                                    <LabelCell label={ labels.estimated }/>
                                    <DateCell date={ procurement.estimated }/>
                                    <DateCell date={ production.estimated }/>
                                    <DateCell date={ qa.estimated }/>
                                </TableRow>
                                <TableRow>
                                    <LabelCell label={ labels.actual }/>
                                    <DateCell date={ procurement.actual }/>
                                    <DateCell date={ production.actual }/>
                                    <DateCell date={ qa.actual }/>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12}>
                    <TextAreaCard
                        titleLabel={ titles.notes }
                        onSubmit={ onNotesSubmit }
                        value={ notes }
                    />
                </Grid>
            </Grid>
        </OrderStatusPermission>
    );
});

SplitInfo.propTypes = {};

export default SplitInfo;