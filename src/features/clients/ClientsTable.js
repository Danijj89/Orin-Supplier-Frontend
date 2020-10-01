import React from 'react';
import Table from '../shared/components/Table.js';
import { ChatBubble as IconChatFull, ChatBubbleOutline as IconChatEmpty } from '@material-ui/icons';
import { LANGUAGE } from '../../constants.js';
import { makeStyles } from '@material-ui/core/styles';
import ThemedButton from '../shared/buttons/ThemedButton.js';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.primary.main,
        '&:hover': {
            color: theme.palette.primary.light,
            backgroundColor: theme.palette.tertiary['200']
        }
    }
}));

const { tableHeaders } = LANGUAGE.client.clientOverview;

export default function ClientsTable({ clients }) {
    const classes = useStyles();

    const rows = clients.map(client => {
        const contact = client.contacts.find(contact => contact._id === client.defaultContact);
        return {
            id: client._id,
            name: client.name,
            contactName: contact.name,
            contactEmail: contact.email,
            lastOrder: client.lastOrder,
            salesYTD: client.salesYTD,
            orderCountYTD: client.orderCountYTD,
            assignedTo: client.assignedTo.name,
            notes: client.notes
        };
    });

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
        <Table rows={rows} columns={columns}/>
    )
}