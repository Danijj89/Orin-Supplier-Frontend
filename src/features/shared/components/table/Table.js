import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Table as MuiTable, TableContainer } from '@material-ui/core';
import TableHeader from './TableHeader.js';
import TableFooter from './TableFooter.js';
import TableBody from './TableBody.js';
import { getComparator, stableSort } from './utils/helpers.js';
import TableToolbar from './TableToolbar.js';


const Table = React.memo(function Table(
    {
        rows,
        columns,
        className,
        onRowClick,
        dense,
        disableRowHover,
        footer,
        maxEmptyRows = 5,
        tools
    }) {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [processedRows, setProcessedRows] = useState(rows || []);

    const onSort = useCallback((field) => {
        const isAsc = orderBy === field && order === 'asc';
        const newOrder = isAsc ? 'desc' : 'asc';
        setOrder(newOrder);
        setOrderBy(field);
        setProcessedRows(stableSort(rows, getComparator(newOrder, field)));
    }, [order, orderBy, rows]);

    const setRows = useCallback(
        (rows) => {
            let newRows = rows;
            if (orderBy) newRows = stableSort(newRows, getComparator(order, orderBy));
            setProcessedRows(newRows);
        }, [order, orderBy]);

    const onPageChange = (event, newPage) => setPage(newPage);
    const onRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer className={ className }>
            { tools && <TableToolbar tools={ tools } rows={ rows } setRows={ setRows }/> }
            <MuiTable stickyHeader size={ dense && 'small' }>
                <TableHeader
                    columns={ columns }
                    order={ order }
                    orderBy={ orderBy }
                    onSort={ onSort }
                />
                <TableBody
                    rows={ processedRows }
                    columns={ columns }
                    rowsPerPage={ rowsPerPage }
                    page={ page }
                    onRowClick={ onRowClick }
                    disableRowHover={ disableRowHover }
                    maxEmptyRows={ maxEmptyRows }
                    dense={ dense }
                />
                <TableFooter
                    footer={ footer }
                    numRows={ processedRows.length }
                    rowsPerPage={ rowsPerPage }
                    page={ page }
                    onPageChange={ onPageChange }
                    onRowsPerPageChange={ onRowsPerPageChange }
                />
            </MuiTable>
        </TableContainer>
    );
});

Table.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    className: PropTypes.string,
    onRowClick: PropTypes.func,
    dense: PropTypes.bool,
    disableRowHover: PropTypes.bool,
    disablePagination: PropTypes.bool,
    maxEmptyRows: PropTypes.number,
    tools: PropTypes.array,
};

export default Table;
