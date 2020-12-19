import React, { useCallback, useMemo, useState } from 'react';
import { LANGUAGE } from '../../app/utils/constants.js';
import Table from '../shared/components/table/Table.js';
import { Box } from '@material-ui/core';
import ContactDialog from '../shared/forms/ContactDialog.js';
import { useDispatch, useSelector } from 'react-redux';
import NewClientContactButton from './NewClientContactButton.js';
import { deleteContact, updateContact, updateDefaultClientContact } from './duck/thunks.js';
import { useParams } from 'react-router-dom';
import { selectActiveClientById } from './duck/selectors.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { CLIENT } from '../admin/utils/resources.js';
import { CREATE_ANY, CREATE_OWN, UPDATE_ANY, UPDATE_OWN } from '../admin/utils/actions.js';
import Permission from '../shared/components/Permission.js';
import { isClientOwner } from '../admin/utils/resourceOwnerCheckers.js';
import { selectSessionUserId } from '../../app/duck/selectors.js';

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
    const sessionUserId = useSelector(selectSessionUserId);
    const client = useSelector(state => selectActiveClientById(state, { clientId }));

    const [isEdit, setIsEdit] = useState(false);
    const [editContact, setEditContact] = useState(null);

    const onRowClick = useCallback(
        (params) => {
            setEditContact(client.contacts.find(contact => contact._id === params.id));
            setIsEdit(true);
        }, [client.contacts]);

    const createSetClientDefaultContactHandler = useCallback(
        (clientId, contactId) => (e) => {
            e.stopPropagation();
            dispatch(updateDefaultClientContact({ clientId, contactId }));
        },
        [dispatch]);

    const onEditCancel = () => setIsEdit(false);
    const onSubmit = (data) => {
        const { _id: contactId, ...update } = data;
        dispatch(updateContact({ clientId, contactId, update }));
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
        client.contacts.map(contact => ({
            id: contact._id,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            fax: contact.fax,
            title: contact.title,
            department: contact.department,
            additional: contact.additional,
            default: contact.default
        })), [client.contacts]);

    return (
        <Box>
            <Table
                rows={ rows }
                columns={ columns }
                onRowClick={ onRowClick }
            />
            <Permission
                resource={ CLIENT }
                action={ [UPDATE_ANY, UPDATE_OWN] }
                isOwner={ isClientOwner(sessionUserId, client) }
            >
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
            </Permission>
            <Permission
                resource={ CLIENT }
                action={ [CREATE_ANY, CREATE_OWN] }
                isOwner={ isClientOwner(sessionUserId, client) }
            >
                <NewClientContactButton clientId={ clientId }/>
            </Permission>
        </Box>
    )
});

export default ClientContactsTable;