import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import { LANGUAGE } from 'app/utils/constants.js';
import FormDialog from 'features/shared/wrappers/FormDialog.js';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import RHFAutoComplete from 'features/shared/rhf/inputs/RHFAutoComplete.js';
import { selectLanguages } from 'app/duck/selectors.js';
import { getOptionId, getOptionLabel } from 'app/utils/options/getters.js';
import SideTextField from 'features/shared/inputs/SideTextField.js';
import { updateRoleDescription } from 'features/admin/duck/roles/thunks.js';

const {
    titles,
    buttons,
    formLabels
} = LANGUAGE.admin.admin.roles;

const fieldNames = {
    language: 'language',
    name: 'name',
    description: 'description'
};

const NewRoleDescriptionButton = React.memo(function NewRoleDescriptionButton({ role }) {
    const dispatch = useDispatch();
    const languages = useSelector(selectLanguages);
    const [isOpen, setIsOpen] = useState(false);

    const { register, control, errors, handleSubmit, watch, setValue } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            language: null,
            name: null,
            description: null
        }
    });

    const language = watch(fieldNames.language);

    useEffect(() => {
        if (language) {
            setValue(fieldNames.name, getOptionLabel(role.name, getOptionId(language)))
            setValue(fieldNames.description, getOptionLabel(role.description, getOptionId(language)));
        }
    }, [language, setValue, role.description]);

    const onOpen = useCallback(() => setIsOpen(true), []);
    const onCancel = useCallback(() => setIsOpen(false), []);

    const onSubmit = useCallback(data => {
        data.language = getOptionId(data.language);
        dispatch(updateRoleDescription({ roleId: role._id, update: data }));
        setIsOpen(false);
    }, [dispatch, role._id]);

    return (
        <>
            <ThemedButton onClick={ onOpen }>
                { buttons.newDescription }
            </ThemedButton>
            <FormDialog
                onSubmit={ handleSubmit(onSubmit) }
                onCancel={ onCancel }
                isOpen={ isOpen }
                titleLabel={ titles.description }
                submitLabel={ buttons.descriptionSubmit }
            >
                <RHFAutoComplete
                    rhfControl={ control }
                    name={ fieldNames.language }
                    label={ formLabels.language }
                    options={ languages }
                    getOptionLabel={ option => getOptionLabel(option) }
                    getOptionSelected={ (option, value) => option._id === value._id }
                    error={ !!errors[fieldNames.language] }
                    required
                />
                <SideTextField
                    name={ fieldNames.name }
                    label={ formLabels.name }
                    inputRef={ register({ required: true }) }
                    error={ !!errors[fieldNames.name] }
                    required
                />
                <SideTextField
                    name={ fieldNames.description }
                    label={ formLabels.description }
                    inputRef={ register({ required: true }) }
                    error={ !!errors[fieldNames.description] }
                    required
                />
            </FormDialog>
        </>
    );
});

NewRoleDescriptionButton.propTypes = {
    role: PropTypes.object.isRequired
};

export default NewRoleDescriptionButton;