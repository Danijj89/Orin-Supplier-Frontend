import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { LANGUAGE } from '../../app/utils/constants.js';
import Table from '../shared/components/table/Table.js';
import { useDispatch, useSelector } from 'react-redux';
import PopoverNotes from '../shared/components/PopoverNotes.js';
import { updateClient } from './duck/thunks.js';
import { selectAllActiveUserNames, selectUsersMap } from '../users/duck/selectors.js';
import { SESSION_CLIENT_TABLE_FILTERS } from '../../app/sessionKeys.js';
import { selectSessionActiveClients } from './duck/selectors.js';

const { clientTableHeadersMap } = LANGUAGE.client.clientOverview;

const ClientsTable = React.memo(function ClientsTable() {
    const history = useHistory();
    const dispatch = useDispatch();
    const clients = useSelector(selectSessionActiveClients);
    const usersMap = useSelector(selectUsersMap);
    const users = useSelector(selectAllActiveUserNames);

    const onRowClick = useCallback(
        (row) => history.push(`/home/clients/${ row.id }?tab=addresses`),
        [history]);

    const createNoteSubmitHandler = useCallback(
        (clientId) =>
            (data) => dispatch(updateClient({ clientId, update: data })),
        [dispatch]);

    const columns = useMemo(() => [
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
                    onSubmit={ createNoteSubmitHandler(params.id) }
                />
        }
    ], [createNoteSubmitHandler]);

    const rows = useMemo(
        () => clients.map(client => {
            const defaultContact = client.contacts.find(c => c.default);
            return {
                id: client._id,
                name: client.name,
                contactName: defaultContact?.name,
                contactEmail: defaultContact?.email,
                lastOrder: client.lastOrder,
                salesYTD: client.salesYTD,
                orderCountYTD: client.orderCountYTD,
                assignedTo: usersMap[client.assignedTo]?.name,
                notes: client.notes
            }
        }), [clients, usersMap]);

    const filterOptions = useMemo(() => ({
        sessionKey: SESSION_CLIENT_TABLE_FILTERS,
        filters: [
            {
                field: 'assignedTo',
                type: 'dropdown',
                label: clientTableHeadersMap.assignedTo,
                options: users
            },
            { field: 'lastOrder', type: 'date', label: clientTableHeadersMap.lastOrder },
            { field: 'salesYTD', type: 'range', label: clientTableHeadersMap.salesYTD },
            { field: 'orderCountYTD', type: 'range', label: clientTableHeadersMap.orderCountYTD }
        ]
    }), [users]);

    return (
        <Table
            rows={ rows }
            columns={ columns }
            onRowClick={ onRowClick }
            filterOptions={ filterOptions }
        />
    );
});

export default ClientsTable;