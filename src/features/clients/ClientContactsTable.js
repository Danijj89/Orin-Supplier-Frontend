import React, { useMemo, useState } from 'react';
import { LANGUAGE } from '../../app/constants.js';
import Table from '../shared/components/table/Table.js';
import { Box } from '@material-ui/core';
import ContactDialog from '../shared/forms/ContactDialog.js';
import { useDispatch } from 'react-redux';
import NewClientContactButton from './NewClientContactButton.js';
import { deleteContact, updateContact } from './duck/thunks.js';

const {
    contactTableHeadersMap,
    editDialogSubmitLabel,
    editDialogTitleLabel
} = LANGUAGE.client.clientDetails.clientContactsTable;

export default function ClientContactsTable({ clientId, clientContacts, clientDefaultContact }) {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [editContact, setEditContact] = useState(null);

    const onRowClick = (params) => {
        setEditContact(clientContacts.find(c => c._id === params.id));
        setIsEdit(true);
    };

    const onEditCancel = () => setIsEdit(false);
    const onEditSubmit = (data) => {
        data.clientId = clientId;
        dispatch(updateContact(data));
        setIsEdit(false);
    };

    const onDeleteContact = (contactId) => {
        dispatch(deleteContact({ clientId, contactId }));
        setIsEdit(false);
    };

    const columns = useMemo(() => [
        { field: 'id', hide: true },
        { field: 'name', headerName: contactTableHeadersMap.name },
        { field: 'email', headerName: contactTableHeadersMap.email },
        { field: 'phone', headerName: contactTableHeadersMap.phone },
        { field: 'fax', headerName: contactTableHeadersMap.fax },
        { field: 'title', headerName: contactTableHeadersMap.title },
        { field: 'department', headerName: contactTableHeadersMap.department },
        { field: 'additional', headerName: contactTableHeadersMap.additional }
    ], []);

    const rows = clientContacts.filter(contact => contact.active).map(contact => ({
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
        <Box>
            <Table
                rows={ rows }
                columns={ columns }
                onRowClick={ onRowClick }
            />
            { editContact && (
                <ContactDialog
                    isOpen={ isEdit }
                    contact={ editContact }
                    titleLabel={ editDialogTitleLabel }
                    submitLabel={ editDialogSubmitLabel }
                    onCancel={ onEditCancel }
                    onSubmit={ onEditSubmit }
                    onDelete={
                        editContact._id !== clientDefaultContact._id
                            ? () => onDeleteContact(editContact._id)
                            : null
                    }
                />
            ) }
            <NewClientContactButton clientId={ clientId }/>
        </Box>
    )
}