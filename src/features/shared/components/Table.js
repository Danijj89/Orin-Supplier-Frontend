import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { DataGrid } from '@material-ui/data-grid';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: 300,
        margin: theme.spacing(3),
    },
    root: {
        '& .MuiDataGrid-iconSeparator': {
            display: 'none',
        },
        '& .MuiDataGrid-colCellTitle': {
            display: 'flex',
            color: theme.palette.tertiary['600'],
            fontWeight: 'bold'
        }
    }
}));

export default function Table({ rows, columns, className }) {
    const classes = useStyles();

    return (
        <Card className={ clsx(classes.container, className) }>
            <DataGrid className={ classes.root } rows={ rows } columns={ columns }/>
        </Card>
    )
};

Table.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired
};