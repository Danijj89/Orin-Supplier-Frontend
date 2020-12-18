import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import FormDialog from '../shared/wrappers/FormDialog.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { selectAllResourceIds } from './duck/resources/selectors.js';
import { actions } from './utils/actions.js';
import { createPermission } from './duck/permissions/thunks.js';

const {
    buttonLabel,
    dialogTitle,
    dialogSubmit,
    formLabels
} = LANGUAGE.admin.admin.permissions.newPermissionButton;

const NewPermissionButton = React.memo(function NewPermissionButton() {
    const dispatch = useDispatch();
    const resources = useSelector(selectAllResourceIds);
    const [open, setOpen] = useState(false);

    const { register, control, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            resource: null,
            action: actions[0]
        }
    });

    const onClick = () => setOpen(true);
    const onCancel = () => setOpen(false);

    const onSubmit = (data) => {
        dispatch(createPermission({ permission: data }));
        setOpen(false);
    };

    return (
        <>
            <ThemedButton onClick={ onClick }>
                { buttonLabel }
            </ThemedButton>
            <FormDialog
                onSubmit={ handleSubmit(onSubmit) }
                onCancel={ onCancel }
                isOpen={ open }
                titleLabel={ dialogTitle }
                submitLabel={ dialogSubmit }
            >
                <SideTextField
                    label={ formLabels._id }
                    name="_id"
                    inputRef={ register({ required: true }) }
                    error={ !!errors._id }
                    required
                    autoFocus
                />
                <RHFAutoComplete
                    rhfControl={ control }
                    name="resource"
                    label={ formLabels.resource }
                    options={ resources }
                    error={ !!errors.resource }
                    required
                />
                <RHFAutoComplete
                    rhfControl={ control }
                    name="action"
                    label={ formLabels.action }
                    options={ actions }
                    error={ !!errors.action }
                    required
                />
                <SideTextField
                    label={ formLabels.attributes }
                    name="attributes"
                    inputRef={ register }
                />
            </FormDialog>
        </>
    );
});

export default NewPermissionButton;