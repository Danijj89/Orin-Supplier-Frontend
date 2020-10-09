import React from 'react';
import PropTypes from 'prop-types';
import { Table as MuiTable, TableContainer, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';


export default function Table({ rows, columns, className, onRowClick }) {

    const onRowClicked = (row) => {
        if (onRowClick) return onRowClick(row);
    }

    const renderColumn = (column) => {
        if (column.hide) return null;
        if (!column.headerName) return <TableCell key={column.field}/>;
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
                        { row[column.field] }
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
                    { rows.map(renderRow) }
                </TableBody>
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