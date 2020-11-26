import React, { useCallback, useMemo, useState } from 'react';
import { LANGUAGE } from '../../app/utils/constants.js';
import Table from '../shared/components/table/Table.js';
import { Box } from '@material-ui/core';
import ContactDialog from '../shared/forms/ContactDialog.js';
import { useDispatch, useSelector } from 'react-redux';
import NewClientContactButton from './NewClientContactButton.js';
import { deleteContact, updateContact, updateDefaultClientContact } from './duck/thunks.js';
import { useParams } from 'react-router-dom';
import { selectClientActiveContacts, selectClientActiveContactsMap } from './duck/selectors.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';

const {
    contactTableHeadersMap,
    editDialogSubmitLabel,
    editDialogTitleLabel,
    defaultButtonLabel,
    setDefaultButtonLabel
} = LANGUAGE.client.clientDetails.clientContactsTable;

const ClientContactsTable = React.memo(function ClientContactsTable() {
    const dispatch = useDispatch();
    const { id: clientId } = useParams();
    const clientContacts = useSelector(state => selectClientActiveContacts(state, clientId));
    const clientContactsMap = useSelector(state => selectClientActiveContactsMap(state, clientId));

    const [isEdit, setIsEdit] = useState(false);
    const [editContact, setEditContact] = useState(null);

    const onRowClick = (params) => {
        setEditContact(clientContactsMap[params.id]);
        setIsEdit(true);
    };

    const createSetClientDefaultContactHandler = useCallback(
        (clientId, contactId) => (e) => {
            e.stopPropagation();
            dispatch(updateDefaultClientContact({ clientId, contactId }));
        },
        [dispatch]);

    const onEditCancel = () => setIsEdit(false);
    const onSubmit = (data) => {
        data.clientId = clientId;
        dispatch(updateContact(data));
        setIsEdit(false);
    };

    const createDeleteContactHandler = useCallback(
        (clientId, editContact) => {
            if (editContact.default) return null;
            return () => {
                dispatch(deleteContact({ clientId, contactId: editContact._id }));
                setIsEdit(false);
            }
        }, [dispatch]);

    const renderDefaultButton = useCallback(
        (params) => {
            if (params.default) return <ThemedButton disabled>{ defaultButtonLabel }</ThemedButton>;
            return (
                <ThemedButton onClick={ createSetClientDefaultContactHandler(clientId, params.id) }>
                    { setDefaultButtonLabel }
                </ThemedButton>
            )
        }, [clientId, createSetClientDefaultContactHandler]);

    const columns = useMemo(() => [
        { field: 'id', hide: true },
        { field: 'name', headerName: contactTableHeadersMap.name },
        { field: 'email', headerName: contactTableHeadersMap.email },
        { field: 'phone', headerName: contactTableHeadersMap.phone },
        { field: 'fax', headerName: contactTableHeadersMap.fax },
        { field: 'title', headerName: contactTableHeadersMap.title },
        { field: 'department', headerName: contactTableHeadersMap.department },
        { field: 'additional', headerName: contactTableHeadersMap.additional },
        {
            field: 'default',
            renderCell: renderDefaultButton,
            align: 'center',
            width: 120
        }
    ], [renderDefaultButton]);

    const rows = useMemo(() =>
        clientContacts.map(contact => ({
            id: contact._id,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            fax: contact.fax,
            title: contact.title,
            department: contact.department,
            additional: contact.additional,
            default: contact.default
        })), [clientContacts]);

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
                    onSubmit={ onSubmit }
                    onDelete={ createDeleteContactHandler(clientId, editContact) }
                />
            ) }
            <NewClientContactButton clientId={ clientId }/>
        </Box>
    )
});

export default ClientContactsTable;