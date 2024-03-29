import React, { useCallback, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectSessionLeads } from './duck/selectors.js';
import Table from '../shared/components/table/Table.js';
import { LANGUAGE } from 'app/utils/constants.js';
import StatusDropdown from '../shared/components/StatusDropdown.js';
import { selectLeadTypes, selectSalesStatuses } from 'app/duck/selectors.js';
import { fetchAllTableLeads, fetchTableLeads, updateLead } from './duck/thunks.js';
import { getOptionId } from 'app/utils/options/getters.js';
import { selectAllActiveUserNames, selectUsersMap } from 'features/home/duck/users/selectors.js';
import PopoverNotes from '../shared/components/PopoverNotes.js';
import { SESSION_LEAD_TABLE_ARCHIVE, SESSION_LEAD_TABLE_FILTERS } from 'app/sessionKeys.js';
import queryString from 'query-string';
import { getLeadTableFiltersFromURL } from "./utils/urls";

const {
    tableHeaders
} = LANGUAGE.lead.overview.leadsTable;

const LeadsTable = React.memo(function LeadsTable() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const salesStatusOptions = useSelector(selectSalesStatuses);
    const leadTypeOptions = useSelector(selectLeadTypes);
    const usersMap = useSelector(selectUsersMap);
    const leads = useSelector(selectSessionLeads);
    const usersName = useSelector(selectAllActiveUserNames);

    const onRowClick = useCallback(
        (row) => history.push(`/home/leads/${ row.id }?tab=details`),
        [history]);

    const createSalesStatusChangeHandler = useCallback(
        (leadId) => (newStatus) =>
            dispatch(updateLead({
                leadId,
                update: {salesStatus: getOptionId(newStatus)}
            })),
        [dispatch]);

    const createLeadTypeChangeHandler = useCallback(
        (leadId) => (newStatus) =>
            dispatch(updateLead({
                leadId,
                update: {leadType: getOptionId(newStatus)}
            })),
        [dispatch]);

    const createNotesSubmitHandler = useCallback(
        (leadId) => (data) =>
            dispatch(updateLead({leadId, update: data})),
        [dispatch]);

    const columns = [
        {field: 'name', headerName: tableHeaders.name},
        {field: 'contactName', headerName: tableHeaders.contactName},
        {field: 'contactEmail', headerName: tableHeaders.contactEmail},
        {
            field: 'salesStatus',
            headerName: tableHeaders.salesStatus,
            renderCell: params =>
                <StatusDropdown
                    status={ params.salesStatus }
                    statuses={ salesStatusOptions }
                    colorMap="salesStatus"
                    onStatusChange={ createSalesStatusChangeHandler(params.id) }
                />,
            align: 'center',
            width: 140
        },
        {
            field: 'leadType',
            headerName: tableHeaders.leadType,
            renderCell: params =>
                <StatusDropdown
                    status={ params.leadType }
                    statuses={ leadTypeOptions }
                    colorMap="leadType"
                    onStatusChange={ createLeadTypeChangeHandler(params.id) }
                />,
            align: 'center',
            width: 140
        },
        {field: 'source', headerName: tableHeaders.source},
        {field: 'quotation', headerName: tableHeaders.quotation, type: 'date'},
        {field: 'sample', headerName: tableHeaders.sample, type: 'date'},
        {field: 'lastContact', headerName: tableHeaders.lastContact, type: 'date'},
        {field: 'assignedTo', headerName: tableHeaders.assignedTo},
        {
            field: 'notes',
            headerName: tableHeaders.notes,
            renderCell: params =>
                <PopoverNotes
                    notes={ params.notes }
                    onSubmit={ createNotesSubmitHandler(params.id) }
                />
        }
    ];

    const rows = useMemo(() => leads.map(lead => ({
        id: lead._id,
        name: lead.name,
        contactName: lead.contact?.name,
        contactEmail: lead.contact?.email,
        salesStatus: lead.salesStatus,
        leadType: lead.leadType,
        source: lead.source,
        quotation: lead.quotation,
        sample: lead.sample,
        lastContact: lead.lastContact,
        assignedTo: usersMap[lead.assignedTo]?.name,
        notes: lead.notes
    })), [leads, usersMap]);

    const tools = useMemo(() => [
        {
            id: 'leads-table-filters',
            type: 'filter',
            options: {
                sessionKey: SESSION_LEAD_TABLE_FILTERS,
                initialValues: getLeadTableFiltersFromURL(queryString.parse(location.search)),
                filters: [
                    {
                        field: 'salesStatus',
                        type: 'option',
                        options: salesStatusOptions,
                        label: tableHeaders.salesStatus
                    },
                    {field: 'leadType', type: 'option', options: leadTypeOptions, label: tableHeaders.leadType},
                    {field: 'source', type: 'text', label: tableHeaders.source},
                    {field: 'quotation', type: 'date', label: tableHeaders.quotation},
                    {field: 'sample', type: 'date', label: tableHeaders.sample},
                    {field: 'lastContact', type: 'date', label: tableHeaders.lastContact},
                    {field: 'assignedTo', type: 'dropdown', options: usersName, label: tableHeaders.assignedTo}
                ]
            }
        },
        {
            id: 'leads-table-archive',
            type: 'archive',
            options: {
                sessionKey: SESSION_LEAD_TABLE_ARCHIVE,
                fetchData: () => dispatch(fetchTableLeads()),
                fetchArchivedData: () => dispatch(fetchAllTableLeads())
            }
        }
    ], [dispatch, leadTypeOptions, salesStatusOptions, usersName, location.search]);

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
            columns={ columns }
            rows={ rows }
            tools={ tools }
            options={ options }
        />
    )
});

export default LeadsTable;