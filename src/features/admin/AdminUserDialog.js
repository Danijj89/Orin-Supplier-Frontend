import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import SideTextField from '../shared/inputs/SideTextField.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { getCompanyLegalName } from 'app/utils/models/getters.js';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import FormDialog from '../shared/wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import { LANGUAGE } from 'app/utils/constants.js';
import { useSelector } from 'react-redux';
import { selectAllCompanies } from './duck/companies/selectors.js';
import makeStyles from '@material-ui/core/styles/makeStyles.js';
import { selectAllActiveRoleIds } from './duck/roles/selectors.js';
import Title6 from 'features/shared/display/Title6.js';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 320,
        height: 230,
        overflow: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
}));

const {
    formLabels
} = LANGUAGE.admin.admin.adminUserDialog;

const AdminUserDialog = React.memo(function AdminUserDialog(
    { user, onCancel, onSubmit, isOpen, titleLabel, submitLabel }) {
    const classes = useStyles();
    const companies = useSelector(selectAllCompanies);
    const roleIds = useSelector(selectAllActiveRoleIds);
    const isEdit = useMemo(() => Boolean(user), [user]);

    const { register, control, errors, handleSubmit, setValue, watch, getValues } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            _id: user?._id,
            name: user?.name || '',
            email: user?.email || '',
            password: null,
            confirmPassword: null,
            company: user?.company || null,
            roles: user?.roles || []
        },
        shouldUnregister: true
    });

    useEffect(() => {
        register({ name: 'roles' }, { validate: roles => roles.length > 0 });
    }, [register]);

    const roles = watch('roles');

    const onCancelClick = useCallback(
        () => {
            onCancel();
            setValue('roles', []);
        }, [setValue, onCancel]);

    const onSelect = useCallback(
        (role) => () => {
            const currentIdx = getValues('roles').indexOf(role);
            const newRoles = [...getValues('roles')];
            if (currentIdx === -1) newRoles.push(role);
            else newRoles.splice(currentIdx, 1);
            setValue('roles', newRoles);
        }, [getValues, setValue]);

    const onFormSubmit = useCallback((data) => {
        let actualData;
        if (isEdit) {
            actualData = {
                _id: data._id,
                roles: data.roles,
                company: data.company
            };
        } else {
            const { _id, ...rest } = data;
            actualData = rest;
            actualData.company = actualData.company._id;
        }
        onSubmit(actualData);
        setValue('roles', []);
    }, [onSubmit, isEdit, setValue]);

    return (
        <FormDialog
            onSubmit={ handleSubmit(onFormSubmit) }
            onCancel={ onCancelClick }
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
        >
            <SideTextField
                label={ formLabels.name }
                name="name"
                inputRef={ register({ required: !isEdit }) }
                error={ !!errors.name }
                required={ !isEdit }
                disabled={ isEdit }
            />
            { !isEdit && <SideTextField
                label={ formLabels.email }
                name="email"
                type="email"
                inputRef={ register({ required: !isEdit }) }
                error={ !!errors.email }
                required
            /> }
            { !isEdit && <SideTextField
                label={ formLabels.password }
                name="password"
                type="password"
                inputRef={ register({ required: !isEdit }) }
                error={ !!errors.password }
                required
            /> }
            { !isEdit && <SideTextField
                label={ formLabels.confirmPassword }
                name="confirmPassword"
                type="password"
                inputRef={ register({ required: !isEdit }) }
                error={ !!errors.confirmPassword }
                required
            /> }
            { !isEdit && <RHFAutoComplete
                rhfControl={ control }
                name="company"
                label={ formLabels.company }
                options={ companies }
                getOptionLabel={ getCompanyLegalName }
                getOptionSelected={ (option, value) => option._id === value._id }
                error={ !isEdit ? !!errors.company : null }
                required={ !isEdit }
            /> }
            <Paper className={ classes.paper }>
                <Title6 title={ formLabels.roles }/>
                <List dense component="div" role="list">
                    { roleIds.map((role) =>
                        <ListItem key={ role } role="listitem" button onClick={ onSelect(role) }>
                            <ListItemIcon>
                                <Checkbox
                                    checked={ roles?.indexOf(role) !== -1 }
                                    tabIndex={ -1 }
                                    disableRipple
                                    color="primary"
                                />
                            </ListItemIcon>
                            <ListItemText primary={ role }/>
                        </ListItem>
                    ) }
                </List>
            </Paper>
        </FormDialog>
    );
});

AdminUserDialog.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    titleLabel: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    user: PropTypes.object
};

export default AdminUserDialog;