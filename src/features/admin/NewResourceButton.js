import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { useForm } from 'react-hook-form';
import FormDialog from '../shared/wrappers/FormDialog.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import { useDispatch } from 'react-redux';
import { createResource } from './duck/resources/thunks.js';

const {
    buttonLabel,
    dialogTitle,
    dialogSubmit,
    formLabels
} = LANGUAGE.admin.admin.resources.newResourceButton;

const NewResourceButton = React.memo(function NewResourceButton() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const { register, errors, handleSubmit } = useForm({
        mode: 'onSubmit'
    });

    const onClick = () => setOpen(true);
    const onCancel = () => setOpen(false);

    const onSubmit = (data) => {
        dispatch(createResource({ resource: data }));
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
            </FormDialog>
        </>
    );
});

export default NewResourceButton;