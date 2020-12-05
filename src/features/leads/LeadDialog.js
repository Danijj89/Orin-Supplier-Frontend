import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../app/duck/selectors.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { selectAllActiveUsers } from '../users/duck/selectors.js';
import FormDialog from '../shared/wrappers/FormDialog.js';
import PropTypes from 'prop-types';

const {
    formLabels
} = LANGUAGE.lead.overview.leadDialog;

const LeadDialog = React.memo(function LeadDialog(
    { isOpen, onSubmit, onCancel, submitLabel, titleLabel }) {
    const users = useSelector(selectAllActiveUsers);
    const currentUser = useSelector(selectCurrentUser);

    const { register, control, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            contactName: '',
            contactEmail: '',
            phone: '',
            source: '',
            assignedTo: currentUser
        }
    });

    return (
        <FormDialog
            onSubmit={ handleSubmit(onSubmit) }
            onCancel={ onCancel }
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
        >
            <SideTextField
                name="name"
                label={ formLabels.name }
                inputRef={ register({ required: true }) }
                error={ !!errors.name }
                required
            />
            <SideTextField
                name="contactName"
                label={ formLabels.contactName }
                inputRef={ register }
            />
            <SideTextField
                name="contactEmail"
                label={ formLabels.contactEmail }
                inputRef={ register }
            />
            <SideTextField
                name="phone"
                label={ formLabels.phone }
                inputRef={ register }
            />
            <SideTextField
                name="source"
                label={ formLabels.source }
                inputRef={ register }
            />
            <RHFAutoComplete
                rhfControl={ control }
                name="assignedTo"
                label={ formLabels.assignedTo }
                options={ users }
                getOptionLabel={ option => option.name }
                getOptionSelected={ (option, value) => option._id === value._id }
            />
        </FormDialog>
    )
});

LeadDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    titleLabel: PropTypes.string.isRequired
};

export default LeadDialog;