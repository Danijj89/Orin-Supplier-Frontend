import React from 'react';
import Table from '../shared/components/Table.js';
import { LANGUAGE } from '../../constants.js';
import { Box, Typography, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: 300
    },
    cell: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: 'inherit'
    }
}));

const { contactsTableHeaders } = LANGUAGE.client.clientDetails;

export default function ClientContactsTable({ contacts }) {
    const classes = useStyles();

    const Cell = (params) =>
        <Tooltip title={params.value || ''} className={classes.cell}>
            <Typography>
                {params.value}
            </Typography>
        </Tooltip>


    const columns = [
        { field: 'id', hide: true },
        { field: 'name', headerName: contactsTableHeaders[0], width: 140, renderCell: Cell },
        { field: 'email', headerName: contactsTableHeaders[1], width: 140, renderCell: Cell },
        { field: 'phone', headerName: contactsTableHeaders[2], width: 140, renderCell: Cell },
        { field: 'fax', headerName: contactsTableHeaders[3], width: 140, renderCell: Cell },
        { field: 'title', headerName: contactsTableHeaders[4], renderCell: Cell },
        { field: 'department', headerName: contactsTableHeaders[5], renderCell: Cell },
        { field: 'additional', headerName: contactsTableHeaders[6], renderCell: Cell },
    ];

    const rows = contacts.map(contact => ({
        id: contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        fax: contact.fax,
        title: contact.title,
        department: contact.department,
        additional: contact.additional
    }));

    return (
        <Box className={ classes.container }>
            <Table rows={ rows } columns={ columns }/>
        </Box>
    )
}