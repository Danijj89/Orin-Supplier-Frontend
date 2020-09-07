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
    yymmddToLocaleDate,
} from '../shared/utils.js';
import { Controller, useForm } from 'react-hook-form';
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

const DateTableCell = ({ name, control }) => {
    const classes = useStyles();
    return (
        <TableCell>
            <Controller
                render={(props) => (
                    <KeyboardDatePicker
                        {...props}
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
                    />
                )}
                control={control}
                name={name}
            />
        </TableCell>
    );
};

export default function OrderStatusInfoTile({ order }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { procurement, production, qa } = order.status;
    const [isEdit, setIsEdit] = useState(false);

    const { register, control, setValue, watch, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            procurementStatus: procurement.status,
            productionStatus: production.status,
            qaStatus: qa.status,
            procurementEstimated: procurement.estimated
                ? convertDateStringToyymmdd(procurement.estimated)
                : null,
            productionEstimated: production.estimated
                ? convertDateStringToyymmdd(production.estimated)
                : null,
            qaEstimated: qa.estimated
                ? convertDateStringToyymmdd(qa.estimated)
                : null,
            procurementActual: procurement.actual
                ? convertDateStringToyymmdd(procurement.actual)
                : null,
            productionActual: production.actual
                ? convertDateStringToyymmdd(production.actual)
                : null,
            qaActual: qa.actual ? convertDateStringToyymmdd(qa.actual) : null,
        },
        shouldUnregister: false,
    });

    useEffect(() => {
        register({ name: 'procurementStatus' }, { required: true });
        register({ name: 'productionStatus' }, { required: true });
        register({ name: 'qaStatus' }, { required: true });
    }, [register]);

    const procurementStatus = watch('procurementStatus');
    const productionStatus = watch('productionStatus');
    const qaStatus = watch('qaStatus');

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
        if (val) return yymmddToLocaleDate(val);
        return '-';
    };

    const onEditClick = () => setIsEdit(true);
    const onEditCancelClick = () => setIsEdit(false);
    const onStatusClick = (step, newStatus) => {
        if (newStatus === 'Completed') {
            const actual = step.substring(0, step.length - 6) + 'Actual';
            setValue(
                actual,
                convertDateStringToyymmdd(new Date().toISOString())
            );
        }
        setValue(step, newStatus);
    };

    const onSubmitClick = (data) => {
        console.log(data);
        const dataToSend = {
            _id: order.status._id,
            procurement: {
                status: data.procurementStatus,
                estimated: data.procurementEstimated,
                actual: data.procurementActual,
            },
            production: {
                status: data.productionStatus,
                estimated: data.productionEstimated,
                actual: data.productionActual,
            },
            qa: {
                status: data.qaStatus,
                estimated: data.qaEstimated,
                actual: data.qaActual,
            },
        };
        dispatch(updateOrderStatus({ orderId: order._id, data: dataToSend }));
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
                                        name="procurementStatus"
                                        status={procurementStatus}
                                    />
                                    <BorderLessDropdown
                                        name="productionStatus"
                                        status={productionStatus}
                                    />
                                    <BorderLessDropdown
                                        name="qaStatus"
                                        status={qaStatus}
                                    />
                                </TableRow>
                                <TableRow>
                                    <BorderLessRowTitleCell
                                        label={rowLabels[1]}
                                    />
                                    <DateTableCell
                                        name="procurementEstimated"
                                        control={control}
                                    />
                                    <DateTableCell
                                        name="productionEstimated"
                                        control={control}
                                    />
                                    <DateTableCell
                                        name="qaEstimated"
                                        control={control}
                                    />
                                </TableRow>
                                <TableRow>
                                    <BorderLessRowTitleCell
                                        label={rowLabels[2]}
                                    />
                                    <DateTableCell
                                        name="procurementActual"
                                        control={control}
                                    />
                                    <DateTableCell
                                        name="productionActual"
                                        control={control}
                                    />
                                    <DateTableCell
                                        name="qaActual"
                                        control={control}
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
