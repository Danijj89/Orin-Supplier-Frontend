import React from 'react';
import PropTypes from 'prop-types';
import {
    Table as MuiTable,
    TableContainer,
} from '@material-ui/core';
import TableHeader from './TableHeader.js';
import TableFooter from './TableFooter.js';
import TableBody from './TableBody.js';

const Table = React.memo(function Table(
    {
        rows,
        columns,
        className,
        onRowClick,
        dense,
        disableRowHover,
        footer,
        maxEmptyRows = 5
    }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const onSort = (field) => {
        const isAsc = orderBy === field && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(field);
    }

    const onPageChange = (event, newPage) => setPage(newPage);
    const onRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer className={ className }>
            <MuiTable stickyHeader size={ dense && 'small' }>
                <TableHeader
                    columns={ columns }
                    order={ order }
                    orderBy={ orderBy }
                    onSort={ onSort }
                />
                <TableBody
                    rows={ rows }
                    columns={ columns }
                    rowsPerPage={ rowsPerPage }
                    page={ page }
                    order={ order }
                    orderBy={ orderBy }
                    onRowClick={ onRowClick }
                    disableRowHover={ disableRowHover }
                    maxEmptyRows={ maxEmptyRows }
                    dense={ dense }
                />
                <TableFooter
                    footer={ footer }
                    numRows={ rows.length }
                    rowsPerPage={ rowsPerPage }
                    page={ page }
                    onPageChange={ onPageChange }
                    onRowsPerPageChange={ onRowsPerPageChange }
                />
            </MuiTable>
        </TableContainer>
    )
});

Table.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    className: PropTypes.string,
    onRowClick: PropTypes.func,
    dense: PropTypes.bool,
    disableRowHover: PropTypes.bool,
    disablePagination: PropTypes.bool,
    maxEmptyRows: PropTypes.number
};

export default Table;