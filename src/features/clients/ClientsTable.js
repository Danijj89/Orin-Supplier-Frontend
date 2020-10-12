import React from 'react';
import { useHistory } from 'react-router-dom';
import { ChatBubble as IconChatFull, ChatBubbleOutline as IconChatEmpty } from '@material-ui/icons';
import { LANGUAGE } from '../../app/constants.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '../shared/components/Table.js';

const useStyles = makeStyles((theme) => ({
    container: {
        height: 300,
        margin: theme.spacing(3),
    }
}));

const { clientTableHeadersMap } = LANGUAGE.client.clientOverview;

export default function ClientsTable({ clients }) {
    const classes = useStyles();
    const history = useHistory();

    const onRowClick = (row) =>
        history.push(`/home/clients/${ row.id }`);

    const renderNotes = (params) => params.notes
        ? <ThemedButton variant="text"><IconChatFull/></ThemedButton>
        : <ThemedButton variant="text"><IconChatEmpty/></ThemedButton>;

    const columns = [
        { field: 'id', hide: true },
        { field: 'name', headerName: clientTableHeadersMap.name },
        { field: 'contactName', headerName: clientTableHeadersMap.contactName },
        { field: 'contactEmail', headerName: clientTableHeadersMap.contactEmail },
        { field: 'lastOrder', headerName: clientTableHeadersMap.lastOrder, type: 'date' },
        { field: 'salesYTD', headerName: clientTableHeadersMap.salesYTD, type: 'number' },
        { field: 'orderCountYTD', headerName: clientTableHeadersMap.orderCountYTD, type: 'number' },
        { field: 'assignedTo', headerName: clientTableHeadersMap.assignedTo },
        { field: 'notes', headerName: clientTableHeadersMap.notes, renderCell: renderNotes, }
    ];

    const rows = clients.map(client => ({
        id: client._id,
        name: client.name,
        contactName: client.defaultContact?.name,
        contactEmail: client.defaultContact?.email,
        lastOrder: client.lastOrder,
        salesYTD: client.salesYTD,
        orderCountYTD: client.orderCountYTD,
        assignedTo: client.assignedTo.name,
        notes: client.notes
    }));

    return (
        <Card className={ classes.container }>
            <Table rows={ rows } columns={ columns } onRowClick={onRowClick}/>
        </Card>
    )
}