import React, { useCallback, useEffect, useMemo, useState } from 'react';
import FormDialog from 'features/shared/wrappers/FormDialog.js';
import SideTextField from 'features/shared/inputs/SideTextField.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyRoleIds } from 'features/admin/duck/roles/selectors.js';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import { Add as IconAdd } from '@material-ui/icons';
import ErrorSnackbar from 'features/shared/components/ErrorSnackbar.js';
import ListPicker from 'features/home/ListPicker.js';
import { createUser } from 'features/home/duck/users/thunks.js';
import { selectSessionUserCompanyId } from 'app/duck/selectors.js';

const {
    formLabels,
    titles,
    buttons,
    errorMessages
} = LANGUAGE.home.newUserButton;

const NewUserButton = React.memo(function NewUserDialog() {
    const dispatch = useDispatch();
    const roleIds = useSelector(selectCompanyRoleIds);
    const sessionCompanyId = useSelector(selectSessionUserCompanyId);
    const [isOpen, setIsOpen] = useState(false);

    const { register, errors, handleSubmit, watch, getValues, setValue } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            roles: []
        }
    });

    useEffect(() => {
        register({ name: 'roles' }, { validate: roles => roles.length > 0 || errorMessages.missingRole });
    }, [register]);

    const chosenRoles = watch('roles');

    const onSelect = useCallback(
        (role) => () => {
            const currentIdx = getValues('roles').indexOf(role);
            const newRoles = [...getValues('roles')];
            if (currentIdx === -1) newRoles.push(role);
            else newRoles.splice(currentIdx, 1);
            setValue('roles', newRoles);
        }, [getValues, setValue]);

    const onOpen = useCallback(() => setIsOpen(true), []);
    const onCancel = useCallback(() => setIsOpen(false), []);

    const onSubmit = useCallback(data => {
        data.company = sessionCompanyId;
        dispatch(createUser({ data }));
        setIsOpen(false);
    }, [dispatch, sessionCompanyId]);

    const errMessages = useMemo(
        () => Object.values(errors).map(error => error.message),
        [errors]);

    return (
        <>
            <ErrorSnackbar error={ errMessages }/>
            <ThemedButton variant="text" onClick={ onOpen }>
                { buttons.newUser }
                <IconAdd/>
            </ThemedButton>
            <FormDialog
                onSubmit={ handleSubmit(onSubmit) }
                onCancel={ onCancel }
                isOpen={ isOpen }
                titleLabel={ titles.newUser }
                submitLabel={ buttons.newUserSubmit }
            >
                <SideTextField
                    label={ formLabels.name }
                    name="name"
                    inputRef={ register({ required: errorMessages.missingName }) }
                    error={ !!errors.name }
                    required
                    autoFocus
                />
                <SideTextField
                    label={ formLabels.email }
                    name="email"
                    inputRef={ register({ required: errorMessages.missingEmail }) }
                    required
                    error={ !!errors.email }
                />
                <SideTextField
                    label={ formLabels.password }
                    name="password"
                    inputRef={ register({ required: errorMessages.missingPassword }) }
                    required
                    error={ !!errors.password }
                    type="password"
                />
                <SideTextField
                    label={ formLabels.confirmPassword }
                    name="confirmPassword"
                    inputRef={ register({
                        validate: confirmPass => getValues('password') === confirmPass
                            || errorMessages.confirmPasswordMismatch
                    }) }
                    required
                    error={ !!errors.confirmPassword }
                    type="password"
                />
                <ListPicker
                    items={ roleIds }
                    chosenItems={ chosenRoles }
                    onSelect={ onSelect }
                    required
                    error={ !!errors.roles }
                />
            </FormDialog>
        </>
    );
});

export default NewUserButton;