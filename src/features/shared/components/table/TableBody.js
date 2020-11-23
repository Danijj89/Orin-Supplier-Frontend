import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow.js';
import { TableRow as MuiTableRow, TableBody as MuiTableBody } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import { getComparator, stableSort } from './utils/helpers.js';

const TableBody = React.memo(function TableBody(
    {
        rows,
        columns,
        rowsPerPage,
        page,
        order,
        orderBy,
        onRowClick,
        disableRowHover,
        maxEmptyRows,
        dense
    }) {
    const rowHeight = dense ? 61 : 69;
    const numColumns = useMemo(
        () => columns.reduce((acc, col) => {
            if (!col.hide) acc += 1;
            return acc;
        }, 0), [columns]);

    const emptyRows = useMemo(() => {
            const rowsInPage = rows.length - page * rowsPerPage;
            return Math.min(
                maxEmptyRows - rowsInPage,
                rowsPerPage
            );
        }, [rowsPerPage, page, rows.length, maxEmptyRows]);

    return (
        <MuiTableBody>
            { (rowsPerPage > 0
                    ? stableSort(rows, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : stableSort(rows, getComparator(order, orderBy))
            ).map((row, index) =>
                <TableRow
                    key={ index }
                    row={ row }
                    columns={ columns }
                    onRowClick={ onRowClick }
                    disableRowHover={ disableRowHover }
                />
            ) }
            { emptyRows > 0 && (
                <MuiTableRow style={ { height: rowHeight * emptyRows } }>
                    <TableCell colSpan={ numColumns }/>
                </MuiTableRow>
            ) }
        </MuiTableBody>
    )
});

TableBody.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    order: PropTypes.string.isRequired,
    maxEmptyRows: PropTypes.number.isRequired,
    orderBy: PropTypes.string,
    onRowClick: PropTypes.func,
    disableRowHover: PropTypes.bool,
    dense: PropTypes.bool
};

export default TableBody;