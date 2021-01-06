import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import { TableSortLabel } from '@material-ui/core';

const TableHeader = React.memo(function TableHeader(
    { columns, orderBy, order, onSort, isEdit, options }) {

    return (
        <TableHead>
            <TableRow>
                { columns.map(column => {
                        if (column.hide) return null;
                        if (column.renderHeader) {
                            return (
                                <TableCell
                                    key={ column.field }
                                    width={ column.width }
                                    align={ column.align }
                                >
                                    { column.renderHeader() }
                                </TableCell>
                            );
                        }
                        if (isEdit) {
                            return (
                                <TableCell key={ column.field } width={ column.width } align={ column.align }>
                                    { column.headerName }
                                </TableCell>
                            );
                        }
                        return (
                            <TableCell
                                key={ column.field }
                                width={ column.width }
                                align={ column.align }
                                sortDirection={ orderBy === column.field ? order : false }
                            >
                                <TableSortLabel
                                    active={ orderBy === column.field }
                                    direction={ orderBy === column.field ? order : 'asc' }
                                    onClick={ () => onSort(column.field) }
                                >
                                    { column.headerName }
                                </TableSortLabel>
                            </TableCell>
                        );
                    }
                ) }
            </TableRow>
        </TableHead>
    )
});

TableHeader.propTypes = {
    columns: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    orderBy: PropTypes.string,
    order: PropTypes.string,
    isEdit: PropTypes.bool,
    options: PropTypes.exact({})
};

export default TableHeader;