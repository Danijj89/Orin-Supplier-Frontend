import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { TableRow as MuiTableRow } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import { dateToLocaleDate, dateToLocaleDatetime } from '../../utils/format.js';
import { getOptionLabel } from 'app/utils/options/getters.js';
import { LOCALE } from 'app/utils/constants.js';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    row: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    sizeSmall: {
        '&:last-child': {
            padding: 0
        }
    }
}));

const TableRow = React.memo(function TableRow(
    { row, columns, onRowClick, numColumns, collapse, hasCollapse, renderCollapse }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const isCollapse = useMemo(() => hasCollapse(row), [hasCollapse, row]);

    const onCollapse = useCallback(() => setOpen(prev => !prev), []);

    const onRowClicked = useCallback(
        row => collapse ? onCollapse() : onRowClick(row), [collapse, onCollapse]);

    const getText = useCallback((column) => {
        const val = row[column.field];
        let result;
        if (column.type === 'number') result = val;
        else if (column.type === 'date') result = dateToLocaleDate(val);
        else if (column.type === 'datetime') result = dateToLocaleDatetime(val);
        else if (column.type === 'option') result = getOptionLabel(val, LOCALE);
        else result = val || '-';
        if (column.format) return column.format(result);
        return result;
    }, [row]);

    return (
        <>
            <MuiTableRow
                onClick={ onRowClicked }
                hover
                className={ classes.row }
            >
                { columns.map(column => {
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
                            { getText(column) }
                        </TableCell>
                    );
                }) }
            </MuiTableRow>
            { isCollapse &&
            <MuiTableRow>
                <TableCell classes={ { sizeSmall: classes.sizeSmall } } colSpan={ numColumns }>
                    <Collapse in={ open } timeout="auto" unmountOnExit>
                        { renderCollapse(row) }
                    </Collapse>
                </TableCell>
            </MuiTableRow>
            }
        </>
    );
});

TableRow.propTypes = {
    row: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    onRowClick: PropTypes.func,
    numColumns: PropTypes.number,
    collapse: PropTypes.bool,
    hasCollapse: PropTypes.func,
    renderCollapse: PropTypes.func
};

export default TableRow;