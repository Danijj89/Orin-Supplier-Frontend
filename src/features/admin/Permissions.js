import React, { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import NewPermissionButton from './NewPermissionButton.js';
import Table from '../shared/components/table/Table.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useSelector } from 'react-redux';
import { selectAllPermissions } from './duck/permissions/selectors.js';
import Paper from '@material-ui/core/Paper';

const {
    tableHeaderLabels
} = LANGUAGE.admin.admin.permissions;

const Permissions = React.memo(function Permissions() {
    const permissions = useSelector(selectAllPermissions);

    const columns = useMemo(() => [
        { field: '_id', headerName: tableHeaderLabels._id },
        { field: 'resource', headerName: tableHeaderLabels.resource},
        { field: 'action', headerName: tableHeaderLabels.action },
        { field: 'attributes', headerName: tableHeaderLabels.attributes }
    ], []);

    const rows = useMemo(() => permissions.map(permission => ({
        _id: permission._id,
        resource: permission.resource,
        action: permission.action,
        attributes: permission.attributes
    })), [permissions]);

    return (
        <Paper>
            <Grid container>
                <NewPermissionButton />
                <Table rows={rows} columns={columns} dense/>
            </Grid>
        </Paper>
    );
});

export default Permissions;