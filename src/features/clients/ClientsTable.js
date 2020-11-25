import React from 'react';
import { useHistory } from 'react-router-dom';
import { LANGUAGE } from '../../app/utils/constants.js';
import Table from '../shared/components/table/Table.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllClients } from './duck/selectors.js';
import PopoverNotes from '../shared/components/PopoverNotes.js';
import { updateClientNotes } from './duck/thunks.js';

const { clientTableHeadersMap } = LANGUAGE.client.clientOverview;

export default function ClientsTable() {
    const history = useHistory();
    const dispatch = useDispatch();
    const clients = useSelector(selectAllClients);

    const onRowClick = (row) =>
        history.push(`/home/clients/${ row.id }`);

    const onNotesSubmit = (clientId, data) =>
        dispatch(updateClientNotes({ id: clientId, notes: data }));

    const columns = [
        { field: 'id', hide: true },
        { field: 'name', headerName: clientTableHeadersMap.name },
        { field: 'contactName', headerName: clientTableHeadersMap.contactName },
        { field: 'contactEmail', headerName: clientTableHeadersMap.contactEmail },
        { field: 'lastOrder', headerName: clientTableHeadersMap.lastOrder, type: 'date' },
        { field: 'salesYTD', headerName: clientTableHeadersMap.salesYTD, type: 'number' },
        { field: 'orderCountYTD', headerName: clientTableHeadersMap.orderCountYTD, type: 'number' },
        { field: 'assignedTo', headerName: clientTableHeadersMap.assignedTo },
        {
            field: 'notes',
            headerName: clientTableHeadersMap.notes,
            renderCell: (params) =>
                <PopoverNotes
                    notes={ params.notes }
                    onSubmit={ (data) => onNotesSubmit(params.id, data)}
                />
        }
    ];

    const rows = clients.filter(client => client.active).map(client => ({
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
        <Table rows={ rows } columns={ columns } onRowClick={ onRowClick }/>
    )
}