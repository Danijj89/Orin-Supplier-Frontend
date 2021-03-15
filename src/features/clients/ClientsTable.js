import React, { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LANGUAGE } from 'app/utils/constants.js';
import Table from '../shared/components/table/Table.js';
import { useDispatch, useSelector } from 'react-redux';
import PopoverNotes from '../shared/components/PopoverNotes.js';
import { updateClient } from './duck/thunks.js';
import { selectAllActiveUserNames, selectUsersMap } from 'features/home/duck/users/selectors.js';
import { SESSION_CLIENT_TABLE_FILTERS } from 'app/sessionKeys.js';
import { selectSessionActiveClients } from './duck/selectors.js';
import { getClientOverviewURL } from "./utils/urls";
import queryString from 'query-string';

const {clientTableHeadersMap} = LANGUAGE.client.clientOverview;

const ClientsTable = React.memo(function ClientsTable() {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const clients = useSelector(selectSessionActiveClients);
    const usersMap = useSelector(selectUsersMap);
    const users = useSelector(selectAllActiveUserNames);

    const onRowClick = useCallback(
        row => history.push(`/home/clients/${ row.id }?tab=addresses`),
        [history]);

    const createNoteSubmitHandler = useCallback(
        (clientId) =>
            (data) => dispatch(updateClient({clientId, update: data})),
        [dispatch]);

    const columns = useMemo(() => [
        {field: 'id', hide: true},
        {field: 'name', headerName: clientTableHeadersMap.name},
        {field: 'contactName', headerName: clientTableHeadersMap.contactName},
        {field: 'contactEmail', headerName: clientTableHeadersMap.contactEmail},
        {field: 'lastOrder', headerName: clientTableHeadersMap.lastOrder, type: 'date'},
        {field: 'orderCountYTD', headerName: clientTableHeadersMap.orderCountYTD, type: 'number'},
        {field: 'assignedTo', headerName: clientTableHeadersMap.assignedTo},
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
                orderCountYTD: client.orderCountYTD,
                assignedTo: usersMap[client.assignedTo]?.name,
                notes: client.notes
            }
        }), [clients, usersMap]);

    const tools = useMemo(() => [
        {
            id: 'clients-table-filters',
            type: 'filter',
            options: {
                sessionKey: SESSION_CLIENT_TABLE_FILTERS,
                initialValues: getClientOverviewURL(queryString.parse(location.search)),
                filters: [
                    {
                        field: 'assignedTo',
                        type: 'dropdown',
                        label: clientTableHeadersMap.assignedTo,
                        options: users
                    },
                    {field: 'lastOrder', type: 'date', label: clientTableHeadersMap.lastOrder},
                    {field: 'orderCountYTD', type: 'range', label: clientTableHeadersMap.orderCountYTD},
                    {field: 'name', type: 'text', label: clientTableHeadersMap.name}
                ]
            },
        }
    ], [users, location.search]);

    const options = useMemo(() => ({
        table: {
            dense: true
        },
        body: {
            onRowClick
        }
    }), [onRowClick]);

    return (
        <Table
            rows={ rows }
            columns={ columns }
            tools={ tools }
            options={ options }
        />
    );
});

export default ClientsTable;