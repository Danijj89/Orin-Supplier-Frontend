import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import FormDialog from '../shared/wrappers/FormDialog.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import { LANGUAGE } from 'app/utils/constants.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { selectAllCompanies } from './duck/companies/selectors.js';
import { selectAllPermissionsIds } from './duck/permissions/selectors.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles.js';
import Paper from '@material-ui/core/Paper';
import { createRole } from './duck/roles/thunks.js';

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
    titles,
    buttons,
    formLabels
} = LANGUAGE.admin.admin.roles;

const NewRoleButton = React.memo(function NewRoleButton() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const companies = useSelector(selectAllCompanies);
    const permissionIds = useSelector(selectAllPermissionsIds);
    const [open, setOpen] = useState(false);

    const { register, control, errors, handleSubmit, setValue, watch, getValues } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            name: null,
            description: null,
            company: null,
            permissions: []
        }
    });

    useEffect(() => {
        register({ name: 'permissions' }, { validate: permissions => permissions.length > 0 });
    }, [register]);

    const permissions = watch('permissions');

    const onClick = () => setOpen(true);
    const onCancel = () => setOpen(false);

    const onSelect = useCallback(
        (permission) => () => {
            const currentIdx = getValues('permissions').indexOf(permission);
            const newPermissions = [...getValues('permissions')];
            if (currentIdx === -1) newPermissions.push(permission);
            else newPermissions.splice(currentIdx, 1);
            setValue('permissions', newPermissions);
        }, [getValues, setValue]);

    const onSubmit = (data) => {
        if (data.company) data.company = data.company._id;
        dispatch(createRole({ role: data }));
        setOpen(false);
    };

    const getCompanyLegalName = useCallback((option) =>
            option.addresses.find(address => address.legal).name,
        []);

    return (
        <>
            <ThemedButton onClick={ onClick }>
                { buttons.newRole }
            </ThemedButton>
            <FormDialog
                onSubmit={ handleSubmit(onSubmit) }
                onCancel={ onCancel }
                isOpen={ open }
                titleLabel={ titles.newRole }
                submitLabel={ buttons.newRoleSubmit }
            >
                <SideTextField
                    label={ formLabels.name }
                    name="name"
                    inputRef={ register({ required: true }) }
                    error={ !!errors.name }
                    required
                />
                <SideTextField
                    label={ formLabels.enDescription }
                    name="description"
                    inputRef={ register({ required: true }) }
                    error={ !!errors.description }
                    required
                />
                <RHFAutoComplete
                    rhfControl={ control }
                    name="company"
                    label={ formLabels.company }
                    options={ companies }
                    getOptionLabel={ getCompanyLegalName }
                    getOptionSelected={ (option, value) => option._id === value._id }
                />
                <Paper className={ classes.paper }>
                    <List dense component="div" role="list">
                        { permissionIds.map((permission) =>
                            <ListItem key={ permission } role="listitem" button onClick={ onSelect(permission) }>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={ permissions.indexOf(permission) !== -1 }
                                        tabIndex={ -1 }
                                        disableRipple
                                        color="primary"
                                    />
                                </ListItemIcon>
                                <ListItemText primary={ permission }/>
                            </ListItem>
                        ) }
                    </List>
                </Paper>
            </FormDialog>
        </>
    );
});

export default NewRoleButton;