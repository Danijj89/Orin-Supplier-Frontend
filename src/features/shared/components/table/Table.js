import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Table as MuiTable, TableContainer } from '@material-ui/core';
import TableHeader from './TableHeader.js';
import TableFooter from './TableFooter.js';
import TableBody from './TableBody.js';
import { getComparator, stableSort } from './utils/helpers.js';
import TableToolbar from './TableToolbar.js';
import useUpdatedState from 'features/shared/hooks/useUpdatedState.js';

const Table = React.memo(function Table({ rows, columns, footer, tools, options = {}}) {
    const {
        table: tableOptions = {},
        head: headOptions = {},
        body: bodyOptions = {},
        foot: footOptions = {},
    } = options;
    const { dense, collapse = false, isEdit = false, classes = {} } = tableOptions;
    const { pagination = true } = footOptions;
    const [processedRows, setProcessedRows] = useUpdatedState(rows || []);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pagination ? 10 : 0);

    const onSort = useCallback((field) => {
        const isAsc = orderBy === field && order === 'asc';
        const newOrder = isAsc ? 'desc' : 'asc';
        setOrder(newOrder);
        setOrderBy(field);
        setProcessedRows(stableSort(rows, getComparator(newOrder, field)));
    }, [order, orderBy, rows, setProcessedRows]);

    const setRows = useCallback(
        (rows) => {
            let newRows = rows;
            if (orderBy) newRows = stableSort(newRows, getComparator(order, orderBy));
            setProcessedRows(newRows);
        }, [order, orderBy, setProcessedRows]);

    const onPageChange = useCallback((event, newPage) => setPage(newPage), []);
    const onRowsPerPageChange = useCallback(event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    return (
        <TableContainer className={ classes.container }>
            { tools && <TableToolbar tools={ tools } rows={ rows } setRows={ setRows }/> }
            <MuiTable className={ classes.table } stickyHeader size={ dense && 'small' }>
                <TableHeader
                    columns={ columns }
                    order={ order }
                    orderBy={ orderBy }
                    onSort={ onSort }
                    isEdit={ isEdit }
                    options={ headOptions }
                />
                <TableBody
                    rows={ processedRows }
                    columns={ columns }
                    rowsPerPage={ rowsPerPage }
                    page={ page }
                    dense={ dense }
                    collapse={ collapse }
                    isEdit={ isEdit }
                    options={ bodyOptions }
                />
                <TableFooter
                    footer={ footer }
                    numRows={ processedRows.length }
                    rowsPerPage={ rowsPerPage }
                    page={ page }
                    onPageChange={ onPageChange }
                    onRowsPerPageChange={ onRowsPerPageChange }
                    isEdit={ isEdit }
                    options={ footOptions }
                />
            </MuiTable>
        </TableContainer>
    );
}, (prev, next) => {
    if (prev.columns !== next.columns) return false;
    if (prev.rows.length !== next.rows.length) return false;
    for (const [k, v] of Object.entries(next.rows)) {
        if (v !== prev.rows[k]) return false;
    }
    return true;
});

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.exact({
        field: PropTypes.string.isRequired,
        headerName: PropTypes.string,
        hide: PropTypes.bool,
        renderHeader: PropTypes.func,
        renderCell: PropTypes.func,
        type: PropTypes.oneOf(['number', 'date', 'datetime', 'option']),
        format: PropTypes.func,
        align: PropTypes.oneOf(['left', 'center', 'right']),
        width: PropTypes.number,
        editType: PropTypes.oneOf(['text', 'number', 'dropdown', 'autocomplete', 'checkbox']),
        options: PropTypes.array,
        getOptionLabel: PropTypes.func,
        getOptionSelected: PropTypes.func
    })).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    footer: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
    tools: PropTypes.arrayOf(PropTypes.object),
    options: PropTypes.exact({
        table: PropTypes.exact({
            dense: PropTypes.bool,
            isEdit: PropTypes.bool,
            pagination: PropTypes.bool,
            collapse: function (props, propName) {
                if (typeof props[propName] != 'boolean') {
                    if (props[propName] != null)
                        return new Error('This property must be a boolean');
                    else if (props.body?.hasCollapse || props.body?.renderCollapse)
                        return new Error('You have to set the table collapse property to true');
                }
            },
            classes: PropTypes.exact({
                container: PropTypes.string,
                table: PropTypes.string
            })
        }),
        head: PropTypes.object,
        body: PropTypes.object,
        foot: PropTypes.object
    })
};

export default Table;
