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
import { LANGUAGE } from '../../../constants.js';

const { paginationAllLabel, rowsPerPageLabel } = LANGUAGE.shared.components.table;

export default function Table({ rows, columns, className, onRowClick }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(1);
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
        if (!column.headerName) return <TableCell key={ column.field }/>;
        if (column.renderHeader)
            return (
                <TableCell key={ column.field }>
                    { column.renderHeader() }
                </TableCell>
            );
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
                    <TableCell key={ column.field }>
                        { column.renderCell(row) }
                    </TableCell>
                );
                return (
                    <TableCell key={ column.field }>
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

    return (
        <TableContainer className={ className }>
            <MuiTable stickyHeader>
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
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            labelRowsPerPage={ rowsPerPageLabel }
                            rowsPerPageOptions={ [1, 2, 50, { label: paginationAllLabel, value: -1 }] }
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
    onRowClick: PropTypes.func
};