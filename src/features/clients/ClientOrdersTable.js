import React from 'react';
import Table from '../shared/components/Table.js';
import { LANGUAGE } from '../../constants.js';
import { Typography, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    cell: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: 'inherit'
    }
}));

const { ordersTableHeaders } = LANGUAGE.client.clientDetails;

export default function ClientOrdersTable({ orders }) {
    const classes = useStyles();

    const Cell = (params) =>
        <Tooltip title={ params.value || '' } className={ classes.cell }>
            <Typography>
                { params.value }
            </Typography>
        </Tooltip>


    const columns = [
        { field: 'id', hide: true },
        { field: 'ref', headerName: ordersTableHeaders[0], width: 140, renderCell: Cell },
    ];

    const rows = orders.map(order => ({
        id: order._id,
        ref: order.ref
    }));

    return (
        <Table rows={ rows } columns={ columns }/>
    )
}