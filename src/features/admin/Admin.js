import React from 'react';
import NewResourceButton from './NewResourceButton.js';
import { useSelector } from 'react-redux';
import { selectAllResources } from './duck/resources/selectors.js';
import { useForm } from 'react-hook-form';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import NewPermissionButton from './NewPermissionButton.js';
import { Grid } from '@material-ui/core';
import { selectAllPermissionsIds } from './duck/permissions/selectors.js';
import NewRoleButton from './NewRoleButton.js';
import { selectAllRoleIds } from './duck/roles/selectors.js';

const {
    formLabels
} = LANGUAGE.admin.admin;

const Admin = React.memo(function Admin() {
    const resources = useSelector(selectAllResources);
    const permissionIds = useSelector(selectAllPermissionsIds);
    const rolesId = useSelector(selectAllRoleIds);

    const { control } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            resource: null,
            permission: null,
            role: null
        }
    });

    return (
        <Grid container>
            <Grid item xs={12}>
                <NewResourceButton/>
                <NewPermissionButton/>
                <NewRoleButton/>
            </Grid>
            <Grid item xs={12}>
                <RHFAutoComplete
                    rhfControl={ control }
                    name="resource"
                    label={ formLabels.resource }
                    options={ resources }
                />
                <RHFAutoComplete
                    rhfControl={ control }
                    name="permission"
                    label={ formLabels.permission }
                    options={ permissionIds }
                />
                <RHFAutoComplete
                    rhfControl={ control }
                    name="role"
                    label={ formLabels.role }
                    options={ rolesId }
                />
            </Grid>
        </Grid>
    );
});

export default Admin;