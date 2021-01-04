import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Table as MuiTable, TableContainer } from '@material-ui/core';
import TableHeader from './TableHeader.js';
import TableFooter from './TableFooter.js';
import TableBody from './TableBody.js';
import { getComparator, stableSort } from './utils/helpers.js';
import TableToolbar from './TableToolbar.js';

const Table = React.memo(function Table({ rows, columns, options, footer }) {
    const { table: tableOptions = {}, head: headOptions = {}, body: bodyOptions = {}, tools } = options;
    const { dense = false, collapse = false, classes = {} } = tableOptions;
    const [processedRows, setProcessedRows] = useState(rows || []);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
        <TableContainer className={ classes.container }>
            { tools && <TableToolbar tools={ tools } rows={ rows } setRows={ setRows }/> }
            <MuiTable stickyHeader size={ dense && 'small' }>
                <TableHeader
                    columns={ columns }
                    order={ order }
                    orderBy={ orderBy }
                    onSort={ onSort }
                    collapse={ collapse }
                    options={ headOptions }
                />
                <TableBody
                    rows={ processedRows }
                    columns={ columns }
                    rowsPerPage={ rowsPerPage }
                    page={ page }
                    dense={ dense }
                    collapse={ collapse }
                    options={ bodyOptions }
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
    options: PropTypes.exact({
        table: PropTypes.exact({
            dense: PropTypes.bool,
            collapse: function (props, propName, componentName) {
                if (typeof props[propName] != 'boolean') {
                    if (props[propName] != null)
                        return new Error('This property must be a boolean');
                    else if (props.body.hasCollapse || props.body.renderCollapse)
                        return new Error('You have to set the table collapse property to true');
                }
            },
            classes: PropTypes.exact({
                container: PropTypes.string
            })
        }),
        head: PropTypes.object,
        body: PropTypes.object,
        tools: PropTypes.arrayOf(PropTypes.object)
    })
};

export default Table;
