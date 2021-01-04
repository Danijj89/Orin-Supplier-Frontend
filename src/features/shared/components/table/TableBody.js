import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow.js';
import { TableRow as MuiTableRow, TableBody as MuiTableBody } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';

const TableBody = React.memo(function TableBody(
    {
        rows,
        columns,
        rowsPerPage,
        page,
        dense,
        collapse,
        options
    }) {
    const { onRowClick, hasCollapse, renderCollapse, maxEmptyRows } = options;
    const rowHeight = useMemo(() => dense ? 61 : 69, [dense]);
    const numColumns = useMemo(
        () => columns.reduce((acc, col) => {
            if (!col.hide) acc += 1;
            return acc;
        }, 0) + (collapse ? 1 : 0)
        , [columns, collapse]);

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
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
            ).map((row, index) =>
                <TableRow
                    key={ index }
                    row={ row }
                    columns={ columns }
                    onRowClick={ onRowClick }
                    numColumns={ numColumns }
                    collapse={ collapse }
                    hasCollapse={ hasCollapse }
                    renderCollapse={ renderCollapse }
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
    options: PropTypes.exact({
        onRowClick: PropTypes.func,
        hasCollapse: PropTypes.func,
        renderCollapse: PropTypes.func,
        maxEmptyRows: PropTypes.number,
    })
};

TableBody.defaultProps = {
    options: {
        maxEmptyRows: 5
    }
};

export default TableBody;