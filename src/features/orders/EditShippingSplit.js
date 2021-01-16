import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { formatQuantityWithUnit, } from 'features/shared/utils/format.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Table from 'features/shared/components/table/Table.js';
import DateField from 'features/shared/inputs/DateField.js';
import DeleteIconButton from 'features/shared/buttons/DeleteIconButton.js';

const useStyles = makeStyles(theme => ({
    container: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    },
    splitContainer: {
        display: 'flex',
        backgroundColor: theme.palette.backgroundSecondary.main,
    },
    left: {
        minWidth: 160,
        minHeight: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: theme.spacing(4)
    },
    right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        padding: theme.spacing(2)
    },
    table: {
        backgroundColor: theme.palette.backgroundPrimary.main
    },
    datePicker: {
        maxWidth: 160
    }
}))

const {
    labels,
    tableHeaderLabels
} = LANGUAGE.order.order.editFulfillmentPlan;

const EditShippingSplit = React.memo(function EditShippingSplit(
    {
        split,
        splitIdx,
        itemOptions,
        allocationMap,
        onCrdChange,
        onCellChange,
        onAddRow,
        onDeleteRow,
        custom1,
        custom2
    }) {
    const classes = useStyles();
    const { ref = '-', crd, items } = split;
    const splitNum = useMemo(() => splitIdx + 1, [splitIdx]);

    const onDateChange = useCallback(
        (_, newValue) => onCrdChange(splitIdx, newValue),
        [splitIdx, onCrdChange]);

    const onCellChanged = useCallback((rowIdx, key, newValue) =>
            onCellChange(splitIdx, rowIdx, key, newValue),
        [onCellChange, splitIdx]);

    const createDeleteRowHandler = useCallback(rowIdx =>
            () => onDeleteRow(splitIdx, rowIdx),
        [onDeleteRow, splitIdx]);

    const columns = useMemo(() => [
        {
            field: 'delete',
            renderCell: params =>
                <DeleteIconButton
                    onClick={ createDeleteRowHandler(params.idx) }
                />,
            width: 50,
            align: 'center'
        },
        {
            field: 'ref',
            headerName: tableHeaderLabels.ref,
            editType: 'dropdown',
            options: itemOptions,
            getOptionLabel: item => item.ref || item,
            getOptionSelected: (order, value) => order.ref === value || value === '',
            filterOptions: items => items.filter(item =>
                allocationMap[item._id].quantity > allocationMap[item._id].allocated)
        },
        { field: 'description', headerName: tableHeaderLabels.description },
        {
            field: 'custom1',
            headerName: custom1,
            hide: custom1 == null,
            width: 140
        },
        {
            field: 'custom2',
            headerName: custom2,
            hide: custom2 == null,
            width: 140
        },
        {
            field: 'quantity',
            headerName: tableHeaderLabels.quantity,
            format: row => formatQuantityWithUnit(row.quantity, row.unit),
            editType: 'number',
            width: 100
        }
    ], [custom1, custom2, createDeleteRowHandler, itemOptions, allocationMap]);

    const rows = useMemo(() => items.map((item, idx) => ({
        idx: idx,
        _id: item._id,
        ref: item.ref,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
        total: item.total,
        custom1: item.custom1,
        custom2: item.custom2
    })), [items]);

    const options = useMemo(() => ({
        table: {
            isEdit: true,
            dense: true,
            classes: {
                container: classes.right,
                table: classes.table
            }
        },
        body: {
            maxEmptyRows: 0,
            onCellChange: onCellChanged,
            hover: false,
            onAddRow: onAddRow
        },
        foot: {
            pagination: 'none'
        }
    }), [classes.table, classes.right, onCellChanged, onAddRow]);

    return (
        <Box className={ classes.container }>
            <Typography>{ ref }</Typography>
            <Box className={ classes.splitContainer }>
                <Box className={ classes.left }>
                    <Avatar>{ splitNum }</Avatar>
                    <Typography>{ labels.crd }</Typography>
                    <DateField
                        onChange={ onDateChange }
                        value={ crd }
                        className={ classes.datePicker }
                        emptyLabel={ labels.emptyDateLabel }
                    />
                </Box>
                <Table
                    rows={ rows }
                    columns={ columns }
                    options={ options }
                />
            </Box>
        </Box>
    );
});

EditShippingSplit.propTypes = {
    split: PropTypes.object.isRequired,
    splitIdx: PropTypes.number.isRequired,
    itemOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    allocationMap: PropTypes.object.isRequired,
    onCrdChange: PropTypes.func.isRequired,
    onCellChange: PropTypes.func.isRequired,
    onAddRow: PropTypes.func.isRequired,
    onDeleteRow: PropTypes.func.isRequired,
    custom1: PropTypes.string,
    custom2: PropTypes.string
};

export default EditShippingSplit;