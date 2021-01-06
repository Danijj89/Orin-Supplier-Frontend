import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow.js';
import { TableRow as MuiTableRow, TableBody as MuiTableBody } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import AddRowButtonRow from 'features/shared/components/table/AddRowButtonRow.js';

const TableBody = React.memo(function TableBody(
    {
        rows,
        columns,
        rowsPerPage,
        page,
        dense,
        collapse,
        isEdit,
        options
    }) {
    const {
        onCellChange,
        onAddRow,
        onRowClick,
        hasCollapse,
        renderCollapse,
        maxEmptyRows
    } = options;
    const rowHeight = useMemo(() => dense ? 61 : 69, [dense]);
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

    const pageRows = useMemo(() =>
            rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows,
        [rows, page, rowsPerPage]);

    const showAddRowButton = useMemo(() => isEdit && onAddRow,
        [isEdit, onAddRow]);

    return (
        <MuiTableBody>
            { pageRows.map((row, idx) =>
                <TableRow
                    key={ idx }
                    row={ row }
                    columns={ columns }
                    onRowClick={ onRowClick }
                    numColumns={ numColumns }
                    collapse={ collapse }
                    hasCollapse={ hasCollapse }
                    renderCollapse={ renderCollapse }
                    rowIdx={ idx }
                    onCellChange={ onCellChange }
                    isEdit={ isEdit }
                />
            ) }
            { !isEdit && emptyRows > 0 && (
                <MuiTableRow style={ { height: rowHeight * emptyRows } }>
                    <TableCell colSpan={ numColumns }/>
                </MuiTableRow>
            ) }
            { showAddRowButton && <AddRowButtonRow numColumns={ numColumns } onAddRow={ onAddRow }/> }
        </MuiTableBody>
    )
});

TableBody.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    dense: PropTypes.bool,
    collapse: PropTypes.bool,
    isEdit: PropTypes.bool,
    options: PropTypes.exact({
        onCellChange: PropTypes.func,
        onRowClick: PropTypes.func,
        hasCollapse: PropTypes.func,
        renderCollapse: PropTypes.func,
        onAddRow: PropTypes.func,
        maxEmptyRows: PropTypes.number,
    })
};

TableBody.defaultProps = {
    options: {
        maxEmptyRows: 5
    }
};

export default TableBody;