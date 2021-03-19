import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import FormDialog from 'features/shared/wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import ErrorSnackbar from 'features/shared/components/ErrorSnackbar.js';
import SideTextField from 'features/shared/inputs/SideTextField.js';
import ListPicker from 'features/home/ListPicker.js';
import { getOptionLabel } from 'app/utils/options/getters.js';
import { useSelector } from 'react-redux';
import { selectAllActiveRoles } from 'features/admin/duck/roles/selectors.js';
import { LANGUAGE } from 'app/utils/constants.js';

const {
    formLabels,
    errorMessages
} = LANGUAGE.home.companyUsers;

const CompanyUserDialog = React.memo(function CompanyUserDialog(
    { user, onSubmit, onCancel, isOpen, titleLabel, submitLabel }) {

    const roles = useSelector(selectAllActiveRoles);
    const isEdit = useMemo(() => Boolean(user), [user]);
    const pickerRoles = useMemo(() => roles.map(role => ({
        value: role._id,
        primary: getOptionLabel(role.name),
        tooltip: getOptionLabel(role.description)
    })), [roles]);

    const { register, errors, handleSubmit, watch, getValues, setValue } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            name: user?.name,
            email: user?.email,
            roles: user?.roles || []
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

    const errMessages = useMemo(
        () => Object.values(errors).map(error => error.message),
        [errors]);

    return (
        <>
            <ErrorSnackbar error={ errMessages }/>
            <FormDialog
                onSubmit={ handleSubmit(onSubmit) }
                onCancel={ onCancel }
                isOpen={ isOpen }
                titleLabel={ titleLabel }
                submitLabel={ submitLabel }
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
                    inputRef={ register({ required: !isEdit && errorMessages.missingPassword }) }
                    required={ !isEdit }
                    error={ !!errors.password }
                    type="password"
                />
                <SideTextField
                    label={ formLabels.confirmPassword }
                    name="confirmPassword"
                    inputRef={ register({
                        required: !isEdit,
                        validate: confirmPass => getValues('password') === confirmPass
                            || errorMessages.confirmPasswordMismatch
                    }) }
                    required={ !isEdit }
                    error={ !!errors.confirmPassword }
                    type="password"
                />
                <ListPicker
                    items={ pickerRoles }
                    chosenItems={ chosenRoles }
                    onSelect={ onSelect }
                    required
                    error={ !!errors.roles }
                />
            </FormDialog>
        </>
    );
});

CompanyUserDialog.propTypes = {
    user: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    titleLabel: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired
};

export default CompanyUserDialog;