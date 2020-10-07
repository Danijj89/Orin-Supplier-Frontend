import React, { useState } from 'react';
import { LANGUAGE } from '../../constants.js';
import { Typography, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '../shared/components/Table.js';

const useStyles = makeStyles((theme) => ({
    cell: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: 'inherit'
    }
}));

const { addressTableHeaders } = LANGUAGE.client.clientDetails;

export default function ClientAddressesTable({ addresses }) {
    const classes = useStyles();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const Cell = (params) =>
        <Tooltip title={ params.value || '' } className={ classes.cell }>
            <Typography>
                { params.value }
            </Typography>
        </Tooltip>

    const onRowClick = (params) => setIsDialogOpen(true);


    const columns = [
        { field: 'id', hide: true },
        { field: 'type', headerName: addressTableHeaders[0], width: 140, renderCell: Cell },
        { field: 'name', headerName: addressTableHeaders[1], width: 140, renderCell: Cell },
        { field: 'address', headerName: addressTableHeaders[2], width: 140, renderCell: Cell },
        { field: 'address2', headerName: addressTableHeaders[3], width: 140, renderCell: Cell },
        { field: 'city', headerName: addressTableHeaders[4], renderCell: Cell },
        { field: 'administrative', headerName: addressTableHeaders[5], renderCell: Cell },
        { field: 'country', headerName: addressTableHeaders[6], renderCell: Cell },
        { field: 'zip', headerName: addressTableHeaders[7], renderCell: Cell },
        { field: 'phone', headerName: addressTableHeaders[8], renderCell: Cell },
        { field: 'email', headerName: addressTableHeaders[9], width: 140, renderCell: Cell },
    ];

    const rows = addresses.map(address => ({
        id: address._id,
        type: address.type,
        name: address.name,
        address: address.address,
        address2: address.address2,
        city: address.city,
        administrative: address.administrative,
        country: address.country,
        zip: address.zip,
        phone: address.phone,
        email: address.email
    }));

    return (
        <Table
            rows={ rows }
            columns={ columns }
            onRowClick={onRowClick}
        />
    )
}