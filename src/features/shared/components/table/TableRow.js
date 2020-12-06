import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { TableRow as MuiTableRow } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import { dateToLocaleDate } from '../../utils/format.js';

const TableRow = React.memo(function TableRow({ row, columns, onRowClick, disableRowHover }) {

    const createRowClickHandler = useCallback(
        (row) => () => { if (onRowClick) return onRowClick(row) },
        [onRowClick]
    );

    const getText = useCallback((column) => {
        const val = row[column.field];
        if (column.type === 'number') return val;
        if (column.type === 'date') return dateToLocaleDate(val);
        return val || '-';
    }, [row]);

    return (
        <MuiTableRow
            onClick={ createRowClickHandler(row) }
            hover={ !disableRowHover }
        >
            { columns.map(column => {
                if (column.hide) return null;
                if (column.renderCell) return (
                    <TableCell
                        key={ column.field }
                        width={ column.width }
                        align={ column.align }
                    >
                        { column.renderCell(row) }
                    </TableCell>
                );
                return (
                    <TableCell
                        key={ column.field }
                        align={ column.align }
                        width={ column.width }
                    >
                        { getText(column) }
                    </TableCell>
                );
            }) }
        </MuiTableRow>
    )
});

TableRow.propTypes = {
    row: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    onRowClick: PropTypes.func,
    disableRowHover: PropTypes.bool
};

export default TableRow;