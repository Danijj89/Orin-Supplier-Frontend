import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    Table as MuiTable,
    TableContainer,
    TableCell,
    TableRow,
    TableBody,
    TableFooter,
    TablePagination
} from '@material-ui/core';
import { LANGUAGE } from '../../../../app/constants.js';
import { makeStyles } from '@material-ui/core/styles';
import TableHeader from './TableHeader.js';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 1000
    },
    footerCell: {
        fontWeight: 'bold',
        fontSize: '1rem',
        color: theme.palette.black.main
    }
}));

const { paginationAllLabel, rowsPerPageLabel } = LANGUAGE.shared.components.table;

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

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
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const numColumns = columns.reduce((acc, col) => {
        if (!col.hide) acc += 1;
        return acc;
    }, 0);
    const rowHeight = dense ? 61 : 69;

    const emptyRows = useMemo(() => {
            const rowsInPage = rows.length - page * rowsPerPage;
            return Math.min(
                maxEmptyRows - rowsInPage,
                rowsPerPage
            );
        },
        [rowsPerPage, page, rows.length, maxEmptyRows]);

    const onSort = (field) => {
        const isAsc = orderBy === field && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(field);
    }

    const onPageChange = (event, newPage) => setPage(newPage);
    const onRowsChangePerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onRowClicked = (row) => {
        if (onRowClick) return onRowClick(row);
    };

    const renderRow = (row, index) => {
        const currRow = columns.map(column => {
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
                        { column.type === 'number' ? row[column.field] : (row[column.field] || '-') }
                    </TableCell>
                );
            }
        );
        return (
            <TableRow
                key={ index }
                onClick={ () => onRowClicked(row) }
                hover={ !disableRowHover }
            >
                { currRow }
            </TableRow>
        )
    };

    const renderFooter = (row, idx) =>
        <TableRow key={ idx }>
            { row.map(cell =>
                <TableCell
                    key={ cell.field }
                    colSpan={ cell.colSpan }
                    align={ cell.align }
                    className={ classes.footerCell }
                >
                    { cell.value }
                </TableCell>
            ) }
        </TableRow>;

    return (
        <TableContainer className={ className }>
            <MuiTable stickyHeader size={ dense && 'small' }>
                <TableHeader
                    columns={ columns }
                    order={ order }
                    orderBy={ orderBy }
                    onSort={ onSort }
                />
                <TableBody>
                    { (rowsPerPage > 0
                            ? stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : stableSort(rows, getComparator(order, orderBy))
                    ).map(renderRow) }
                    { emptyRows > 0 && (
                        <TableRow style={ { height: rowHeight * emptyRows } }>
                            <TableCell colSpan={ numColumns }/>
                        </TableRow>
                    ) }
                </TableBody>
                <TableFooter>
                    { footer && footer.map((row, i) => renderFooter(row, i)) }
                    <TableRow>
                        <TablePagination
                            labelRowsPerPage={ rowsPerPageLabel }
                            rowsPerPageOptions={ [10, 25, 50, { label: paginationAllLabel, value: -1 }] }
                            colSpan={ numColumns }
                            count={ rows.length }
                            rowsPerPage={ rowsPerPage }
                            page={ page }
                            SelectProps={ { native: true, } }
                            onChangePage={ onPageChange }
                            onChangeRowsPerPage={ onRowsChangePerPage }
                        />
                    </TableRow>
                </TableFooter>
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