import React from 'react';
import { useHistory } from 'react-router-dom';
import Table from '../shared/wrappers/Table.js';
import { ChatBubble as IconChatFull, ChatBubbleOutline as IconChatEmpty } from '@material-ui/icons';
import { LANGUAGE } from '../../constants.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: 300,
        margin: theme.spacing(3),
    }
}));

const { tableHeaders } = LANGUAGE.client.clientOverview;

export default function ClientsTable({ clients }) {
    const classes = useStyles();
    const history = useHistory();

    const onRowClick = (params) => {
        history.push(`/home/clients/${ params.getValue('id') }`);
    };

    const rows = clients.map(client => ({
        id: client._id,
        name: client.name,
        contactName: client.defaultContact.name,
        contactEmail: client.defaultContact.email,
        lastOrder: client.lastOrder,
        salesYTD: client.salesYTD,
        orderCountYTD: client.orderCountYTD,
        assignedTo: client.assignedTo.name,
        notes: client.notes
    }));

    const columns = [
        { field: 'id', hide: true },
        { field: 'name', headerName: tableHeaders[0], width: 180 },
        { field: 'contactName', headerName: tableHeaders[1], width: 180 },
        { field: 'contactEmail', headerName: tableHeaders[2], width: 180 },
        { field: 'lastOrder', headerName: tableHeaders[3], type: 'date', width: 140 },
        { field: 'salesYTD', headerName: tableHeaders[4], type: 'number', width: 180 },
        { field: 'orderCountYTD', headerName: tableHeaders[5], type: 'number', width: 180 },
        { field: 'assignedTo', headerName: tableHeaders[6], width: 180 },
        {
            field: 'notes',
            headerName: tableHeaders[7],
            renderCell: params => params.value
                ? <ThemedButton variant="text"><IconChatFull/></ThemedButton>
                : <ThemedButton variant="text"><IconChatEmpty/></ThemedButton>,
            width: 80,
            headerAlign: 'center'
        }
    ];

    return (
        <Card className={ classes.container }>
            <Table rows={ rows } columns={ columns } onRowClick={ onRowClick }/>
        </Card>
    )
}