import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Table as MuiTable,
    TableContainer,
} from '@material-ui/core';
import TableHeader from './TableHeader.js';
import TableFooter from './TableFooter.js';
import TableBody from './TableBody.js';
import { getComparator, stableSort } from './utils/helpers.js';
import FilterSelector from './FilterSelector.js';
import { getOptionId } from '../../../../app/utils/options/getters.js';
import Box from '@material-ui/core/Box';

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
        filterOptions
    }) {


    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [processedRows, setProcessedRows] = useState(rows || []);

    const prevRows = useRef(rows);
    useEffect(() => {
        if (prevRows.current !== rows) {
            setProcessedRows(rows);
        }
    }, [rows]);

    const onSort = (field) => {
        const isAsc = orderBy === field && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(field);
        setProcessedRows(stableSort(rows, getComparator(order, orderBy)));
    };

    const onFilter = useCallback(
        (filters) => {
            let filteredRows = [...rows];
            for (const filter of filters) {
                switch (filter.type) {
                    case 'date':
                        if (filter.start && filter.end)
                            filteredRows = filteredRows.filter(row => {
                                const val = new Date(row[filter.field]);
                                return val >= filter.start && val <= filter.end;
                            });
                        else if (filter.start) {
                            filteredRows = filteredRows.filter(row => {
                                return new Date(row[filter.field]) >= filter.start;
                            });
                        } else filteredRows = filteredRows.filter(row => new Date(row[filter.field]) <= filter.end);
                        break;
                    case 'option':
                        filteredRows = filteredRows.filter(row => filter.values.includes(getOptionId(row[filter.field])));
                        break;
                    case 'text':
                        filteredRows = filteredRows.filter(row => row[filter.field].includes(filter.value));
                        break;
                    case 'dropdown':
                        filteredRows = filteredRows.filter(row => row[filter.field] === filter.value);
                        break;
                    case 'range':
                        if (filter.min && filter.max) filteredRows = filteredRows.filter(row => {
                            const val = row[filter.field];
                            return val >= filter.min && val <= filter.max;
                        });
                        else if (filter.min) filteredRows = filteredRows.filter(row => row[filter.field] >= filter.min);
                        else filteredRows = filteredRows.filter(row => row[filter.field] <= filter.max);
                        break;
                    default:
                }
            }
            if (orderBy) filteredRows = stableSort(filteredRows, getComparator(order, orderBy));
            setProcessedRows(filteredRows);
        }, [order, orderBy, rows]);

    const onPageChange = (event, newPage) => setPage(newPage);
    const onRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer className={ className }>
            <Box hidden={ !Boolean(filterOptions) }>
                { filterOptions && <FilterSelector filterOptions={ filterOptions } onFilter={ onFilter }/> }
            </Box>
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
    maxEmptyRows: PropTypes.number,
    filterOptions: PropTypes.object
};

export default Table;

