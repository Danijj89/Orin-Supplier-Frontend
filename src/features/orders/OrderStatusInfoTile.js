import React, { useEffect, useState } from 'react';
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
    TableCell,
    IconButton,
    TextField
} from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { makeStyles } from '@material-ui/core/styles';
import StatusTooltip from '../shared/displays/StatusTooltip.js';
import { yymmddToLocaleDate } from '../shared/utils.js';
import { useForm } from 'react-hook-form';
import { Clear as IconClear, Check as IconCheck } from '@material-ui/icons';
import StatusButtonMenu from '../shared/StatusButtonMenu.js';

const { title, editButton, headers, rowLabels } = LANGUAGE.order.orderStatusInfoTile;

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2),
        height: 260,
        minHeight: 240,
        minWidth: 360
    },
    titleRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        height: 52
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
    },
    dropdown: {
        borderBottom: 'none',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        maxWidth: 90
    },
    datepicker: {
        borderBottom: 'none',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    datepickerInput: {
        width: 90
    },
    editCancel: {
        color: 'red'
    },
    editConfirm: {
        color: 'green'
    }
}));

export default function OrderStatusInfoTile({ status }) {
    const classes = useStyles();
    const { procurement, production, qa } = status;
    const [edit, setEdit] = useState(false);


    const { register, setValue, watch, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            procurementStatus: procurement.status,
            productionStatus: production.status,
            qaStatus: qa.status,
            procurementEstimated: procurement.estimated,
            productionEstimated: production.estimated,
            qaEstimated: qa.estimated,
            procurementActual: procurement.actual,
            productionActual: production.actual,
            qaActual: qa.actual
        }
    });

    useEffect(() => {
        register({ name: 'procurementStatus' }, { required: true });
        register({ name: 'productionStatus' }, { required: true });
        register({ name: 'qaStatus' }, { required: true });
    }, [register]);

    const procurementStatus = watch('procurementStatus');
    const productionStatus = watch('productionStatus');
    const qaStatus = watch('qaStatus');

    const BorderLessHeaderCell = ({ header }) =>
        <TableCell align="center" classes={ { root: classes.header } }>
            { header }
        </TableCell>

    const BorderLessRowTitleCell = ({ label }) =>
        <TableCell align="left" className={ classes.column1 }>
            { label }
        </TableCell>

    const BorderLessTooltipCell = ({ status }) =>
        <TableCell align="center" className={ classes.tooltip }>
            <StatusTooltip status={ status }/>
        </TableCell>

    const BorderLessCell = ({ value }) =>
        <TableCell align="center" className={ classes.date }>
            { getDateRep(value) }
        </TableCell>

    const BorderLessDropdown = ({ value, name }) =>
        <TableCell align="center" className={ classes.dropdown } padding="none">
            <StatusButtonMenu onMenuItemClick={ onStatusClick } value={ value } name={name}/>
        </TableCell>

    const BorderLessDatepicker = ({ name }) =>
        <TableCell align="center" className={ classes.datepicker } padding="none">
            <TextField type="date" inputRef={ register } name={ name }
                       style={{ width: '80%'}} size="small"/>
        </TableCell>

    const getDateRep = (val) => {
        if (val) return yymmddToLocaleDate(val);
        return yymmddToLocaleDate(Date.now());
    }

    const onEditClick = () => setEdit(true);
    const onEditCancelClick = () => setEdit(false);
    const onStatusClick = (step, newStatus) => {
        console.log(procurementStatus)
        console.log(step);
        console.log(newStatus);
        setValue(step, newStatus);
    }
    const onSubmitClick = (data) => {

    };

    return (
        <Card className={ classes.card } elevation={ 3 }>
            <form onSubmit={ handleSubmit(onSubmitClick) } autoComplete="off">
                <Grid container>
                    <Grid
                        container
                        item xs={ 12 }
                        className={ classes.titleRow }
                    >
                        <Grid container item justify="flex-start" alignItems="center" xs={ 7 }>
                            <Typography variant="h5" className={ classes.title }>{ title }</Typography>
                        </Grid>
                        { !edit &&
                        <Grid container item justify="flex-end" alignItems="center" xs={ 5 }>
                            <ThemedButton
                                variant="outlined"
                                text={ editButton }
                                styles={ classes.edit }
                                onClick={ onEditClick }
                            />
                        </Grid>
                        }
                        { edit &&
                        <Grid container item justify="flex-end" alignItems="center" xs={ 5 }>
                            <IconButton
                                className={ classes.editCancel }
                                onClick={ onEditCancelClick }
                                size="small"
                            >
                                <IconClear/>
                            </IconButton>
                            <IconButton
                                className={ classes.editConfirm }
                                size="small"
                                type="submit"
                            >
                                <IconCheck/>
                            </IconButton>
                        </Grid>
                        }
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
                                { !edit &&
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
                                        <BorderLessRowTitleCell label={ rowLabels[2] }/>
                                        <BorderLessCell value={ procurement.actual }/>
                                        <BorderLessCell value={ production.actual }/>
                                        <BorderLessCell value={ qa.actual }/>
                                    </TableRow>
                                </TableBody> }
                                { edit &&
                                <TableBody>
                                    <TableRow>
                                        <BorderLessRowTitleCell label={ rowLabels[0] }/>
                                        <BorderLessDropdown
                                            name="procurementStatus"
                                            value={ procurementStatus }
                                        />
                                        <BorderLessDropdown
                                            name="productionStatus"
                                            value={ productionStatus }
                                        />
                                        <BorderLessDropdown
                                            name="qaStatus"
                                            value={ qaStatus }
                                        />
                                    </TableRow>
                                    <TableRow>
                                        <BorderLessRowTitleCell label={ rowLabels[1] }/>
                                        <BorderLessDatepicker
                                            name="procurementEstimated"
                                        />
                                        <BorderLessDatepicker
                                            name="productionEstimated"
                                        />
                                        <BorderLessDatepicker
                                            name="qaEstimated"
                                        />
                                    </TableRow>
                                    <TableRow>
                                        <BorderLessRowTitleCell label={ rowLabels[2] }/>
                                        <BorderLessDatepicker
                                            name="procurementActual"
                                        />
                                        <BorderLessDatepicker
                                            name="productionActual"
                                        />
                                        <BorderLessDatepicker
                                            name="qaActual"
                                        />
                                    </TableRow>
                                </TableBody>
                                }
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </form>
        </Card>
    )
}