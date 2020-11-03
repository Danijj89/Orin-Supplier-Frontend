import React from 'react';
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
import ThemedButton from '../../buttons/ThemedButton.js';
import { LANGUAGE } from '../../../../app/constants.js';
import EditableRow from './EditableRow.js';

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

const { addRowButtonLabel } = LANGUAGE.shared.components.editableTable;

export default function EditableTable(
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
                <TableHead>
                    <TableRow>
                        { columns.map(renderColumn) }
                    </TableRow>
                </TableHead>
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
                    <TableRow>
                        <TableCell colSpan={ numColumns }>
                            <ThemedButton onClick={ onAddRow } variant="outlined">
                                { addRowButtonLabel }
                            </ThemedButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    { footer.map((row, i) => renderFooter(row, i)) }
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

EditableTable.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    onCellChange: PropTypes.func.isRequired,
    onAddRow: PropTypes.func.isRequired,
    className: PropTypes.string,
    footer: PropTypes.array
};