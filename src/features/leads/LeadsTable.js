import React, { useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllLeads } from './duck/selectors.js';
import Table from '../shared/components/table/Table.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import StatusDropdown from '../shared/components/StatusDropdown.js';
import { selectLeadTypes, selectSalesStatuses } from '../../app/duck/selectors.js';
import { updateLead } from './duck/thunks.js';
import { getOptionId } from '../../app/utils/options/getters.js';
import { selectUsersMap } from '../users/duck/selectors.js';
import PopoverNotes from '../shared/components/PopoverNotes.js';
import { dateToLocaleDate } from '../shared/utils/format.js';

const {
    tableHeaders
} = LANGUAGE.lead.overview.leadsTable;

const LeadsTable = React.memo(function LeadsTable() {
    const dispatch = useDispatch();
    const history = useHistory();
    const salesStatusOptions = useSelector(selectSalesStatuses);
    const leadTypeOptions = useSelector(selectLeadTypes);
    const usersMap = useSelector(selectUsersMap);
    const leads = useSelector(selectAllLeads);

    const onRowClick = useCallback(
        (params) => history.push(`/home/leads/${ params.id }?tab=details`),
        [history]);

    const createSalesStatusChangeHandler = useCallback(
        (leadId) => (newStatus) =>
            dispatch(updateLead({
                leadId,
                update: { salesStatus: getOptionId(newStatus) }
            })),
        [dispatch]);

    const createLeadTypeChangeHandler = useCallback(
        (leadId) => (newStatus) =>
            dispatch(updateLead({
                leadId,
                update: { leadType: getOptionId(newStatus) }
            })),
        [dispatch]);

    const createNotesSubmitHandler = useCallback(
        (leadId) => (data) =>
            dispatch(updateLead({ leadId, update: data })),
        [dispatch]);

    const columns = [
        { field: 'id', hide: true },
        { field: 'name', headerName: tableHeaders.name },
        { field: 'contactName', headerName: tableHeaders.contactName },
        { field: 'contactEmail', headerName: tableHeaders.contactEmail },
        {
            field: 'salesStatus',
            headerName: tableHeaders.salesStatus,
            renderCell: params =>
                <StatusDropdown
                    status={ params.salesStatus }
                    statuses={ salesStatusOptions }
                    colorMap="salesStatus"
                    onStatusChange={ createSalesStatusChangeHandler }
                />
        },
        {
            field: 'leadType',
            headerName: tableHeaders.leadType,
            renderCell: params =>
                <StatusDropdown
                    status={ params.leadType }
                    statuses={ leadTypeOptions }
                    colorMap="leadType"
                    onStatusChange={ createLeadTypeChangeHandler }
                />
        },
        { field: 'source', headerName: tableHeaders.source },
        { field: 'quotation', headerName: tableHeaders.quotation },
        { field: 'sample', headerName: tableHeaders.sample },
        { field: 'lastContact', headerName: tableHeaders.lastContact },
        { field: 'assignedTo', headerName: tableHeaders.assignedTo },
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
        quotation: dateToLocaleDate(lead.quotation),
        sample: dateToLocaleDate(lead.sample),
        lastContact: dateToLocaleDate(lead.lastContact),
        assignedTo: usersMap[lead.assignedTo]?.name,
        notes: lead.notes
    })), [leads, usersMap]);

    return (
        <Table
            rows={ rows }
            columns={ columns }
            onRowClick={ onRowClick }
        />
    )
});

export default LeadsTable;