import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import FormDialog from '../wrappers/FormDialog.js';
import SideTextField from '../inputs/SideTextField.js';
import { LANGUAGE } from '../../../app/utils/constants.js';
import RHFAutoComplete from '../rhf/inputs/RHFAutoComplete.js';
import { useSelector } from 'react-redux';
import { selectAllActiveUsers, selectUserById } from '../../users/duck/selectors.js';
import { selectIncoterms } from '../../../app/duck/selectors.js';

const {
    nameLabel,
    assignedToLabel,
    contactNameLabel,
    contactEmailLabel,
    taxNumberLabel,
    sourceLabel,
    incotermLabel,
    paymentTermLabel,
    notesLabel,
    deleteMessage
} = LANGUAGE.shared.forms.clientDialog;

const ClientDialog = React.memo(function ClientDialog(
    {
        isOpen,
        onSubmit,
        onCancel,
        submitLabel,
        client,
        titleLabel,
        isEdit,
        onDelete
    }) {
    const incotermOptions = useSelector(selectIncoterms);
    const users = useSelector(selectAllActiveUsers);
    const initialUser = useSelector(state => selectUserById(state, client.assignedTo));

    const { register, errors, handleSubmit, control, reset } = useForm({
        mode: 'onSubmit'
    });

    useEffect(() => {
        reset({
            name: client?.name,
            assignedTo: initialUser || null,
            contactName: null,
            contactEmail: null,
            taxNumber: client?.taxNumber,
            source: client?.source,
            incoterm: client?.incoterm || incotermOptions[0],
            payment: client?.payment,
            notes: !isEdit ? client?.notes : null
        });
    }, [reset, client, isEdit, incotermOptions, initialUser]);

    return (
        <FormDialog
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onSubmit) }
            onDelete={ onDelete }
            deleteMessage={ deleteMessage }
        >
            <SideTextField
                name="name"
                label={ nameLabel }
                inputRef={ register({ required: true }) }
                error={ !!errors.name }
                required
                autoFocus
            />
            <RHFAutoComplete
                rhfControl={ control }
                name="assignedTo"
                label={ assignedToLabel }
                options={ users }
                getOptionLabel={ option => option.name }
                getOptionSelected={ (option, value) => option._id === value._id || !value.active }
            />
            { !isEdit && <SideTextField
                name="contactName"
                label={ contactNameLabel }
                inputRef={ register }
            /> }
            { !isEdit && <SideTextField
                name="contactEmail"
                label={ contactEmailLabel }
                inputRef={ register }
            /> }
            <SideTextField
                name="taxNumber"
                label={ taxNumberLabel }
                inputRef={ register }
            />
            <SideTextField
                name="source"
                label={ sourceLabel }
                inputRef={ register }
            />
            <RHFAutoComplete
                rhfControl={ control }
                name="incoterm"
                label={ incotermLabel }
                options={ incotermOptions }
            />
            <SideTextField
                name="payment"
                label={ paymentTermLabel }
                inputRef={ register }
            />
            { !isEdit && <SideTextField
                name="notes"
                multiline
                rows={ 4 }
                rowsMax={ 8 }
                label={ notesLabel }
                inputRef={ register }
            /> }
        </FormDialog>
    )
});

ClientDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    titleLabel: PropTypes.string.isRequired,
    client: PropTypes.object,
    isEdit: PropTypes.bool,
    onDelete: PropTypes.func
};

export default ClientDialog;