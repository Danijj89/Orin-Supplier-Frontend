import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { LANGUAGE } from 'app/utils/constants.js';
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TableFooter as MuiTableFooter } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    footerCell: {
        fontWeight: 'bold',
        fontSize: '1rem',
        color: theme.palette.black.main,
    },
}));

const { paginationAllLabel, rowsPerPageLabel } = LANGUAGE.shared.components.table;

const TableFooter = React.memo(function TableFooter(
    {
        footer,
        numRows,
        rowsPerPage,
        page,
        onPageChange,
        onRowsPerPageChange,
        isEdit,
        options
    }) {
    const classes = useStyles();
    const { pagination = 'permanent', paginationOptions } = options;
    const rowsPerPageOptions = useMemo(() => {
        let options;
        if (paginationOptions) options = [...paginationOptions];
        else options = [10, 25, 50];
        options.push({ label: paginationAllLabel, value: -1 });
        return options;
    }, [paginationOptions]);
    const hasPagination = useMemo(() => {
        if (!isEdit) {
            if (pagination === 'permanent') return true;
            if (pagination === 'hide') return numRows > rowsPerPage;
        }
        return false;
    }, [pagination, isEdit, numRows, rowsPerPage]);

    return (
        <MuiTableFooter >
            { footer && footer.map((row, i) =>
                <TableRow key={ i }>
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
            { hasPagination &&
            <TableRow>
                <TablePagination
                    labelRowsPerPage={ rowsPerPageLabel }
                    rowsPerPageOptions={ rowsPerPageOptions }
                    count={ numRows }
                    rowsPerPage={ rowsPerPage }
                    page={ page }
                    SelectProps={ { native: true } }
                    onChangePage={ onPageChange }
                    onChangeRowsPerPage={ onRowsPerPageChange }
                />
            </TableRow>
            }
        </MuiTableFooter>
    )
});

TableFooter.propTypes = {
    numRows: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRowsPerPageChange: PropTypes.func.isRequired,
    footer: PropTypes.array,
    isEdit: PropTypes.bool,
    options: PropTypes.exact({
        pagination: PropTypes.oneOf(['permanent', 'hide', 'none']),
        paginationOptions: PropTypes.arrayOf(PropTypes.number.isRequired),
        initialRowsPerPage: PropTypes.number
    })
};

export default TableFooter;