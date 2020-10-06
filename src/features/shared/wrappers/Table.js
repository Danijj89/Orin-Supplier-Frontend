import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiDataGrid-iconSeparator': {
            display: 'none',
        },
        '& .MuiDataGrid-colCellTitle': {
            color: theme.palette.tertiary['600'],
            fontWeight: 'bold'
        }
    }
}));

export default function Table({ rows, columns, className, ...props }) {
    const classes = useStyles();

    return (
        <DataGrid
            {...props}
            className={ clsx(classes.root, className) }
            rows={ rows }
            columns={ columns }
        />
    )
};

Table.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    className: PropTypes.string
};