import React, { useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NewRoleButton from './NewRoleButton.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { useForm } from 'react-hook-form';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useSelector } from 'react-redux';
import { selectAllRoles } from './duck/roles/selectors.js';
import Table from '../shared/components/table/Table.js';

const {
    rolesLabel,
    tableHeaderLabels
} = LANGUAGE.admin.admin.roles;

const Roles = React.memo(function Roles() {
    const roles = useSelector(selectAllRoles);

    const { control, watch } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            role: null
        }
    });

    const role = watch('role');

    const columns = useMemo(() => [
        { field: '_id', headerName: tableHeaderLabels._id },
    ], []);

    const rows = useMemo(() => {
        if (!role) return [];
        return role.permissions.map(permission => ({
            _id: permission._id,
        }));
    }, [role]);

    return (
        <Paper>
            <Grid container>
                <Grid item xs={12}>
                    <NewRoleButton />
                </Grid>
                <Grid item xs={12}>
                    <RHFAutoComplete
                        rhfControl={ control }
                        name="role"
                        label={ rolesLabel }
                        options={ roles }
                        getOptionLabel={ option => option._id }
                        getOptionSelected={ (option, value) => option._id === value._id }
                    />
                </Grid>
                <Table rows={rows} columns={columns} />
            </Grid>
        </Paper>
    );
});

export default Roles;