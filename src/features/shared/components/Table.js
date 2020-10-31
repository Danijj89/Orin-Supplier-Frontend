import React from 'react';
import PropTypes from 'prop-types';
import {
    Table as MuiTable,
    TableContainer,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    TableFooter,
    TablePagination
} from '@material-ui/core';
import { LANGUAGE } from '../../../app/constants.js';
import Loader from './Loader.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footerCell: {
        fontWeight: 'bold',
        fontSize: '1rem',
        color: theme.palette.black.main
    }
}));

const { paginationAllLabel, rowsPerPageLabel } = LANGUAGE.shared.components.table;

const ROW_HEIGHT = 69;

export default function Table(
    { rows, columns, className, onRowClick, dense, isLoading, disableRowHover, footer }) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const numColumns = columns.reduce((acc, col) => col.hide ? acc : acc += 1, 0);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const onPageChange = (event, newPage) => setPage(newPage);
    const onRowsChangePerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onRowClicked = (row) => {
        if (onRowClick) return onRowClick(row);
    };

    const renderColumn = (column) => {
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
        return (
            <TableCell
                key={ column.field }
                width={ column.width }
                align={ column.align }
            >
                { column.headerName }
            </TableCell>
        );
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
                <TableHead>
                    <TableRow>
                        { columns.map(renderColumn) }
                    </TableRow>
                </TableHead>
                <TableBody>
                    { isLoading &&
                    <TableRow style={ { height: ROW_HEIGHT * rowsPerPage } }>
                        <TableCell colSpan={ numColumns } valign="middle" align="left">
                            <Loader/>
                        </TableCell>
                    </TableRow>
                    }
                    { !isLoading && (rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                    ).map(renderRow) }
                    { !isLoading && emptyRows > 0 && (
                        <TableRow style={ { height: ROW_HEIGHT * emptyRows } }>
                            <TableCell colSpan={ numColumns }/>
                        </TableRow>
                    ) }
                </TableBody>
                <TableFooter>
                    { footer && footer.map((row, i) => renderFooter(row, i)) }
                    <TableRow>
                        <TablePagination
                            labelRowsPerPage={ rowsPerPageLabel }
                            rowsPerPageOptions={ [5, 10, 25, { label: paginationAllLabel, value: -1 }] }
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
};

Table.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    className: PropTypes.string,
    onRowClick: PropTypes.func,
    dense: PropTypes.bool,
    isLoading: PropTypes.bool,
    disableRowHover: PropTypes.bool,
    disablePagination: PropTypes.bool
};