import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { TableRow as MuiTableRow } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import { dateToLocaleDate, dateToLocaleDatetime } from '../../utils/format.js';
import { getOptionLabel } from 'app/utils/options/getters.js';
import { LOCALE } from 'app/utils/constants.js';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import CustomCell from 'features/shared/components/table/cells/CustomCell.js';
import TextFieldCell from 'features/shared/components/table/cells/TextFieldCell.js';
import AutoCompleteCell from 'features/shared/components/table/cells/AutoCompleteCell.js';
import CheckBoxCell from 'features/shared/components/table/cells/CheckBoxCell.js';
import TextCell from 'features/shared/components/table/cells/TextCell.js';

const useStyles = makeStyles(() => ({
    row: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    sizeSmall: {
        '&:last-child': {
            padding: 0
        }
    }
}));

function getText(row, column) {
    if (column.format) return column.format(row);
    const val = row[column.field];
    if (column.type === 'number') return val;
    if (column.type === 'date') return dateToLocaleDate(val);
    if (column.type === 'datetime') return dateToLocaleDatetime(val);
    if (column.type === 'option') return getOptionLabel(val, LOCALE);
    return val || '-';
}

const TableRow = React.memo(function TableRow(
    {
        row,
        columns,
        onRowClick,
        numColumns,
        collapse,
        hasCollapse,
        renderCollapse,
        rowIdx,
        onCellChange,
        isEdit,
        hover
    }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const isCollapse = useMemo(
        () => hasCollapse ? hasCollapse(row) : false,
        [hasCollapse, row]);

    const onCollapse = useCallback(
        () => setOpen(prev => !prev), []);

    const onRowClicked = useCallback(
        () => {
            if (!isEdit) {
                if (collapse) onCollapse();
                else if (onRowClick) onRowClick(row);
            }
        },
        [collapse, onCollapse, onRowClick, isEdit, row]);

    const renderedRow = useMemo(() => columns.map(column => {
        if (column.hide) return null;
        if (column.renderCell) return (
            <CustomCell
                key={ column.field }
                row={ row }
                render={ column.renderCell }
                width={ column.width }
                align={ column.align }
                isEdit={ isEdit }
            />
        );
        if (!isEdit || !column.editType) return (
            <TableCell
                key={ column.field }
                align={ column.align }
                width={ column.width }
            >
                { getText(row, column) }
            </TableCell>
        );
        switch (column.editType) {
            case 'text':
                return (
                    <TextFieldCell
                        key={ column.field }
                        rowIdx={ rowIdx }
                        field={ column.field }
                        value={ row[column.field] }
                        width={ column.width }
                        onCellChange={ onCellChange }
                    />
                )
            case 'number':
                return (
                    <TextFieldCell
                        key={ column.field }
                        rowIdx={ rowIdx }
                        field={ column.field }
                        value={ row[column.field] }
                        width={ column.width }
                        onCellChange={ onCellChange }
                        type={ 'number' }
                    />
                );
            case 'dropdown':
                return (
                    <AutoCompleteCell
                        key={ column.field }
                        rowIdx={ rowIdx }
                        field={ column.field }
                        value={ row[column.field] }
                        width={ column.width }
                        onCellChange={ onCellChange }
                        options={ column.options }
                        getOptionLabel={ column.getOptionLabel }
                        getOptionSelected={ column.getOptionSelected }
                        filterOptions={ column.filterOptions }
                    />
                );
            case 'autocomplete':
                return (
                    <AutoCompleteCell
                        key={ column.field }
                        freeSolo
                        rowIdx={ rowIdx }
                        field={ column.field }
                        value={ row[column.field] }
                        width={ column.width }
                        onCellChange={ onCellChange }
                        options={ column.options }
                        getOptionLabel={ column.getOptionLabel }
                        getOptionSelected={ column.getOptionSelected }
                        filterOptions={ column.filterOptions }
                    />
                );
            case 'checkbox':
                return (
                    <CheckBoxCell
                        key={ column.field }
                        checked={ row[column.field] }
                        onCellChange={ onCellChange }
                        rowIdx={ rowIdx }
                        field={ column.field }
                        width={ column.width }
                    />
                )
            default:
                return (
                    <TextCell
                        key={ column.field }
                        align={ column.align }
                        width={ column.width }
                        value={ row[column.field] }
                    />
                )
        }
    }), [columns, isEdit, onCellChange, row, rowIdx]);

    return (
        <>
            <MuiTableRow onClick={ onRowClicked } hover={ hover }>
                { renderedRow }
            </MuiTableRow>
            { isCollapse &&
            <MuiTableRow className={ classes.row }>
                <TableCell classes={ { sizeSmall: classes.sizeSmall } } colSpan={ numColumns }>
                    <Collapse in={ open } timeout="auto" unmountOnExit>
                        { renderCollapse(row) }
                    </Collapse>
                </TableCell>
            </MuiTableRow>
            }
        </>
    );
}, (prev, next) => {
    for (const [k, v] of Object.entries(prev.row)) {
        if (v !== next.row[k]) return false;
    }
    return prev.columns === next.columns;
});

TableRow.propTypes = {
    row: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    onRowClick: PropTypes.func,
    numColumns: PropTypes.number,
    collapse: PropTypes.bool,
    hasCollapse: PropTypes.func,
    renderCollapse: PropTypes.func,
    rowIdx: PropTypes.number,
    onCellChange: PropTypes.func,
    isEdit: PropTypes.bool,
    hover: PropTypes.bool
};

export default TableRow;