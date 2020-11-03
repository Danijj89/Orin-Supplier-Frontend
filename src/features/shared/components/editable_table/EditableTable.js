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

const useStyles = makeStyles((theme) => ({
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
        paddingBottom: theme.spacing(0.5)
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

    const renderFooter = (row, idx) =>
        <TableRow key={ idx } className={ classes.footerRow }>
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
            <Table>
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
                    <AddRowButtonRow numColumns={ numColumns } onAddRow={ onAddRow }/>
                </TableBody>
                <TableFooter>
                    { footer.map((row, i) => renderFooter(row, i)) }
                </TableFooter>
            </Table>
        </TableContainer>
    )
}, (prev, next) => {
    for (const [k, v] of Object.entries(prev.rows)) {
        if (v !== next.rows[k]) return false;
    }
    for (let i = 0; i < prev.columns.length; i++) {
        if (prev.columns[i].hide !== next.columns[i].hide) return false;
    }
    return true;
});

EditableTable.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    onCellChange: PropTypes.func.isRequired,
    onAddRow: PropTypes.func.isRequired,
    className: PropTypes.string,
    footer: PropTypes.array
};

export default EditableTable;