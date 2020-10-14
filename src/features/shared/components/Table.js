import React from 'react';
import PropTypes from 'prop-types';
import {
    Table as MuiTable,
    TableContainer,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    TableFooter,
    TablePagination
} from '@material-ui/core';
import { LANGUAGE } from '../../../app/constants.js';

const { paginationAllLabel, rowsPerPageLabel } = LANGUAGE.shared.components.table;

function getAlignment(type) {
    switch (type) {
        case 'number': return 'right';
        case 'date': return 'center';
        default: return 'left';
    }
}

export default function Table({ rows, columns, className, onRowClick, dense }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const numColumns = columns.reduce((acc, col) => col.hide ? acc : acc += 1, 0);

    const onPageChange = (event, newPage) => setPage(newPage);
    const onRowsChangePerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onRowClicked = (row) => {
        if (onRowClick) return onRowClick(row);
    };

    const renderColumn = (column) => {
        if (column.hide) return null;
        if (column.renderHeader) {
            return (
                <TableCell key={ column.field }>
                    { column.renderHeader() }
                </TableCell>
            );
        }
        return (
            <TableCell key={ column.field }>
                { column.headerName }
            </TableCell>
        );
    };

    const renderRow = (row, index) => {
        const currRow = columns.map(column => {
                if (column.hide) return null;
                if (column.renderCell) return (
                    <TableCell key={ column.field } align={getAlignment(column.type)}>
                        { column.renderCell(row) }
                    </TableCell>
                );
                return (
                    <TableCell key={ column.field } align={getAlignment(column.type)}>
                        { row[column.field] || '-' }
                    </TableCell>
                );
            }
        );
        return (
            <TableRow key={ index } onClick={ () => onRowClicked(row) } hover>
                { currRow }
            </TableRow>
        )
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <TableContainer className={ className }>
            <MuiTable stickyHeader size={dense && 'small'}>
                <TableHead>
                    <TableRow>
                        { columns.map(renderColumn) }
                    </TableRow>
                </TableHead>
                <TableBody>
                    { (rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                    ).map(renderRow) }
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 69 * emptyRows }}>
                            <TableCell colSpan={numColumns} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            labelRowsPerPage={ rowsPerPageLabel }
                            rowsPerPageOptions={ [5, 10, 25, { label: paginationAllLabel, value: -1 }] }
                            colSpan={ numColumns }
                            count={ rows.length }
                            rowsPerPage={ rowsPerPage }
                            page={ page }
                            SelectProps={ { native: true, } }
                            onChangePage={ onPageChange }
                            onChangeRowsPerPage={ onRowsChangePerPage }
                        />
                    </TableRow>
                </TableFooter>
            </MuiTable>
        </TableContainer>
    )
};

Table.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    className: PropTypes.string,
    onRowClick: PropTypes.func,
    dense: PropTypes.bool
};