import React, { useMemo } from 'react';
import {
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableCell as MuiTableCell,
    TableRow,
    withStyles, TableFooter
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import EditableRow from './EditableRow.js';
import AddRowButtonRow from './AddRowButtonRow.js';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    footerRow: {
        height: 69
    },
    footerCell: {
        fontWeight: 'bold',
        fontSize: '1rem',
        color: theme.palette.black.main
    }
}));

export const TableCell = withStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        '&:last-child': {
            paddingRight: theme.spacing(0.5)
        },
        '&:first-child': {
            paddingLeft: theme.spacing(0.5)
        }
    }
}))(MuiTableCell);

const EditableTable = React.memo(function EditableTable(
    { columns, rows, onCellChange, className, footer, onAddRow }) {
    const classes = useStyles();
    const numColumns = columns.reduce((acc, col) => {
        if (!col.hide) acc += 1;
        return acc;
    }, 0);


    const renderColumn = (column) => {
        if (column.hide) return null;
        if (column.renderHeader) {
            return (
                <TableCell key={ column.field } width={ column.width } align={ column.align }>
                    { column.renderHeader() }
                </TableCell>
            );
        }
        return (
            <TableCell key={ column.field } width={ column.width } align={ column.align }>
                { column.headerName }
            </TableCell>
        );
    };

    const tableHead = useMemo(() =>
            <TableHead>
                <TableRow>
                    { columns.map(renderColumn) }
                </TableRow>
            </TableHead>
        , [columns]);

    const tableFooter = useMemo(() =>
            <TableFooter>
                { footer.map((row, i) =>
                    <TableRow key={ i } className={ classes.footerRow }>
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
                    </TableRow>
                ) }
            </TableFooter>,
        [footer, classes.footerRow, classes.footerCell])

    return (
        <TableContainer className={ clsx(classes.container, className) }>
            <Table size="small">
                { tableHead }
                <TableBody>
                    { rows.map((row, idx) =>
                        <EditableRow
                            key={ idx }
                            columns={ columns }
                            row={ row }
                            rowIdx={ idx }
                            onCellChange={ onCellChange }
                        />
                    ) }
                    { onAddRow && <AddRowButtonRow numColumns={ numColumns } onAddRow={ onAddRow }/> }
                </TableBody>
                { tableFooter }
            </Table>
        </TableContainer>
    )
}, (prev, next) => {
    for (let i = 0; i < next.columns.length; i++) {
        if (prev.columns[i].hide !== next.columns[i].hide) return false;
    }
    if (prev.rows.length !== next.rows.length) return false;
    for (const [k, v] of Object.entries(next.rows)) {
        if (v !== prev.rows[k]) return false;
    }
    return true;
});

EditableTable.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    onCellChange: PropTypes.func.isRequired,
    onAddRow: PropTypes.func,
    className: PropTypes.string,
    footer: PropTypes.array
};

export default EditableTable;