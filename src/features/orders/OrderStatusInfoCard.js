import React, { useEffect, useState } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell as MuiTableCell,
} from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    convertDateStringToyymmdd,
    dateToLocaleDate,
} from '../shared/utils/random.js';
import { useForm } from 'react-hook-form';
import StatusButtonMenu from './StatusButtonMenu.js';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from './duck/thunks.js';
import OrderInfoCard from './OrderInfoCard.js';
import { CalendarToday as IconCalendar } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';

const { title, headers, rowLabels } = LANGUAGE.order.orderStatusInfoTile;

const useStyles = makeStyles((theme) => ({
    column1: {
        color: theme.palette.tertiary['600'],
        borderBottom: 'none',
        textAlign: 'left',
    },
    tableContainer: {
        padding: theme.spacing(2),
    },
    header: {
        color: theme.palette.tertiary['700'],
        fontWeight: 'bold',
        borderBottom: 'none',
        textAlign: 'center',
    },
    date: {
        fontSize: '0.8rem',
        borderBottom: 'none',
        textAlign: 'center',
    },
    dropdown: {
        borderBottom: 'none',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        maxWidth: 90,
        textAlign: 'center',
    },
    datepicker: {
        maxWidth: 120,
    },
    datepickerInput: {
        fontSize: 10,
    },
}));

const TableCell = withStyles((theme) => ({
    root: {
        borderBottom: 'none',
        maxWidth: 90,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
}))(MuiTableCell);

const DateTableCell = ({ name, value, onDateChange }) => {
    const classes = useStyles();
    return (
        <TableCell>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="none"
                InputProps={{
                    classes: {
                        input: classes.datepickerInput,
                    },
                }}
                keyboardIcon={<IconCalendar style={{ fontSize: 10 }} />}
                className={classes.datepicker}
                onChange={(e) => onDateChange(name, e) }
                value={value}
            />
        </TableCell>
    );
};

export default function OrderStatusInfoCard({ order }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const { register, setValue, watch, handleSubmit, getValues } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            procurement: order.procurementS,
            production: order.productionS,
            qa: order.qaS,
        },
        shouldUnregister: false,
    });

    useEffect(() => {
        register({ name: 'procurement' }, { required: true });
        register({ name: 'production' }, { required: true });
        register({ name: 'qa' }, { required: true });
    }, [register]);

    const procurement = watch('procurement');
    const production = watch('production');
    const qa = watch('qa');

    const BorderLessHeaderCell = ({ header }) => (
        <TableCell className={classes.header}>{header}</TableCell>
    );

    const BorderLessRowTitleCell = ({ label }) => (
        <TableCell className={classes.column1}>{label}</TableCell>
    );

    const BorderLessCell = ({ value }) => (
        <TableCell className={classes.date}>{getDateRep(value)}</TableCell>
    );

    const BorderLessDropdown = ({ status, name, disabled = false }) => (
        <TableCell className={classes.dropdown}>
            <StatusButtonMenu
                disabled={disabled}
                onItemClick={onStatusClick}
                status={status}
                name={name}
            />
        </TableCell>
    );

    const getDateRep = (val) => {
        if (val) return dateToLocaleDate(val);
        return '-';
    };

    const onEditClick = () => setIsEdit(true);
    const onEditCancelClick = () => setIsEdit(false);
    const onStatusClick = (step, newStatus) => {
        const stepData = {...getValues(step)};
        stepData.status = newStatus;
        if (newStatus === 'Completed') {
            stepData.actual = convertDateStringToyymmdd(new Date().toISOString());
        }
        setValue(step, stepData);
    };
    const onEstimatedDateChange = (step, newDate) => {
        const stepData = getValues(step);
        setValue(step, {...stepData, estimated: newDate});
    }

    const onActualDateChange = (step, newDate) => {
        const stepData = getValues(step);
        setValue(step, {...stepData, actual: newDate});
    }

    const onSubmitClick = (data) => {
        dispatch(updateOrderStatus({ orderId: order._id, data }));
        setIsEdit(false);
    };

    return (
        <OrderInfoCard
            title={title}
            isEdit={isEdit}
            onEdit={onEditClick}
            onCancel={onEditCancelClick}
            onConfirm={handleSubmit(onSubmitClick)}
        >
            {!isEdit && (
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <BorderLessHeaderCell />
                                {headers.map((header, index) => (
                                    <BorderLessHeaderCell
                                        key={index}
                                        header={header}
                                    />
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <BorderLessRowTitleCell label={rowLabels[0]} />
                                <BorderLessDropdown
                                    status={procurement.status}
                                    disabled
                                />
                                <BorderLessDropdown
                                    status={production.status}
                                    disabled
                                />
                                <BorderLessDropdown
                                    status={qa.status}
                                    disabled
                                />
                            </TableRow>
                            <TableRow>
                                <BorderLessRowTitleCell label={rowLabels[1]} />
                                <BorderLessCell value={procurement.estimated} />
                                <BorderLessCell value={production.estimated} />
                                <BorderLessCell value={qa.estimated} />
                            </TableRow>
                            <TableRow>
                                <BorderLessRowTitleCell label={rowLabels[2]} />
                                <BorderLessCell value={procurement.actual} />
                                <BorderLessCell value={production.actual} />
                                <BorderLessCell value={qa.actual} />
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {isEdit && (
                <form onSubmit={handleSubmit(onSubmitClick)} autoComplete="off">
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <BorderLessHeaderCell />
                                    {headers.map((header, index) => (
                                        <BorderLessHeaderCell
                                            key={index}
                                            header={header}
                                        />
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <BorderLessRowTitleCell
                                        label={rowLabels[0]}
                                    />
                                    <BorderLessDropdown
                                        name="procurement"
                                        status={procurement.status}
                                    />
                                    <BorderLessDropdown
                                        name="production"
                                        status={production.status}
                                    />
                                    <BorderLessDropdown
                                        name="qa"
                                        status={qa.status}
                                    />
                                </TableRow>
                                <TableRow>
                                    <BorderLessRowTitleCell
                                        label={rowLabels[1]}
                                    />
                                    <DateTableCell
                                        name="procurement"
                                        onDateChange={onEstimatedDateChange}
                                        value={procurement.estimated}
                                    />
                                    <DateTableCell
                                        name="production"
                                        onDateChange={onEstimatedDateChange}
                                        value={production.estimated}
                                    />
                                    <DateTableCell
                                        name="qa"
                                        onDateChange={onEstimatedDateChange}
                                        value={qa.estimated}
                                    />
                                </TableRow>
                                <TableRow>
                                    <BorderLessRowTitleCell
                                        label={rowLabels[2]}
                                    />
                                    <DateTableCell
                                        name="procurement"
                                        onDateChange={onActualDateChange}
                                        value={procurement.actual}
                                    />
                                    <DateTableCell
                                        name="production"
                                        onDateChange={onActualDateChange}
                                        value={production.actual}
                                    />
                                    <DateTableCell
                                        name="qa"
                                        onDateChange={onActualDateChange}
                                        value={qa.actual}
                                    />
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </form>
            )}
        </OrderInfoCard>
    );
}
