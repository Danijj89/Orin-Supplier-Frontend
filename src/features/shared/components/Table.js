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
    tableCell: props => props.dense && {
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5)
    }
}));

const { paginationAllLabel, rowsPerPageLabel } = LANGUAGE.shared.components.table;

function getAlignment(type) {
    switch (type) {
        case 'number':
            return 'right';
        case 'date':
            return 'center';
        default:
            return 'left';
    }
}

const ROW_HEIGHT = 69;

export default function Table(
    { rows, columns, className, onRowClick, dense, isLoading, disableRowHover, disablePagination }) {
    const classes = useStyles({ dense });
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const numColumns = columns.reduce((acc, col) => col.hide ? acc : acc += 1, 0);

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
                    className={ classes.tableCell }>
                    { column.renderHeader() }
                </TableCell>
            );
        }
        return (
            <TableCell
                key={ column.field }
                className={ classes.tableCell }
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
                        className={ classes.tableCell }
                    >
                        { column.renderCell(row) }
                    </TableCell>
                );
                return (
                    <TableCell
                        key={ column.field }
                        align={ getAlignment(column.type) }
                        width={ column.width }
                        className={ classes.tableCell }
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <TableContainer className={ className }>
            <MuiTable stickyHeader>
                <TableHead>
                    <TableRow>
                        { columns.map(renderColumn) }
                    </TableRow>
                </TableHead>
                { disablePagination &&
                <TableBody>
                    { rows.map(renderRow) }
                </TableBody>
                }
                { !disablePagination &&
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
                </TableBody> }
                { !disablePagination &&
                <TableFooter>
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
                </TableFooter> }
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