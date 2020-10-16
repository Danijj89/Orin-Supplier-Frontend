import React from 'react';
import {
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableCell as MuiTableCell,
    TableRow,
    withStyles
} from '@material-ui/core';
import Loader from './Loader.js';
import TableTextField from '../inputs/TableTextField.js';
import PropTypes from 'prop-types';
import TableAutoComplete from '../inputs/TableAutoComplete.js';


const TableCell = withStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5)
    }
}))(MuiTableCell);

export default function EditableTable({ columns, rows, isLoading, onCellChange, className }) {
    const numColumns = columns.reduce((acc, col) => col.hide ? acc : acc += 1, 0);

    const renderColumn = (column) => {
        if (column.hide) return null;
        if (column.renderHeader) {
            return (
                <TableCell key={ column.field } width={ column.width }>
                    { column.renderHeader() }
                </TableCell>
            );
        }
        return (
            <TableCell key={ column.field } width={ column.width }>
                { column.headerName }
            </TableCell>
        );
    };

    const renderRow = (row, idx) => {
        const currRow = columns.map(column => {
                if (column.hide) return null;
                if (column.renderCell) return (
                    <TableCell key={ column.field } width={ column.width }>
                        { column.renderCell(row) }
                    </TableCell>
                );
                switch (column.type) {
                    case 'text':
                        return (
                            <TableCell key={ column.field } width={ column.width }>
                                <TableTextField
                                    value={ row[column.field] }
                                    onChange={ e => onCellChange(idx, column.field, e.target.value) }
                                />
                            </TableCell>
                        );
                    case 'number':
                        return (
                            <TableCell key={ column.field } width={ column.width }>
                                <TableTextField
                                    type="number"
                                    value={ row[column.field].toString() }
                                    onChange={ e => onCellChange(idx, column.field, e.target.value) }
                                />
                            </TableCell>
                        );
                    case 'dropdown':
                        console.log()
                        return (
                            <TableCell key={ column.field } width={ column.width }>
                                <TableAutoComplete
                                    value={ row[column.field] }
                                    options={ column.options }
                                    getOptionLabel={ column.getOptionLabel }
                                    getOptionSelected={ column.getOptionSelected }
                                    onChange={ (value) => onCellChange(idx, column.field, value) }
                                />
                            </TableCell>
                        );
                    case 'autocomplete':
                        return (
                            <TableCell key={ column.field } width={ column.width }>
                                <TableAutoComplete
                                    freeSolo
                                    autoSelect
                                    options={ column.options }
                                    getOptionLabel={ column.getOptionLabel }
                                    getOptionSelected={ (item) => column.getOptionSelected(item, row) }
                                    onChange={ (value) => onCellChange(idx, column.field, value) }
                                />
                            </TableCell>
                        );
                    default:
                        return (
                            <TableCell
                                key={ column.field }
                                align={ column.align }
                                width={ column.width }
                            >
                                { typeof(row[column.field]) === 'number' ? row[column.field] : (row[column.field] || '-') }
                            </TableCell>
                        )
                }
            }
        );
        return (
            <TableRow key={ idx }>
                { currRow }
            </TableRow>
        )
    };

    return (
        <TableContainer className={className}>
            <Table>
                <TableHead>
                    <TableRow>
                        { columns.map(renderColumn) }
                    </TableRow>
                </TableHead>
                <TableBody>
                    { isLoading &&
                    <TableRow>
                        <TableCell colSpan={ numColumns } valign="middle" align="left">
                            <Loader/>
                        </TableCell>
                    </TableRow>
                    }
                    { !isLoading && rows.map(renderRow) }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

EditableTable.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    onCellChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    isLoading: PropTypes.bool
};