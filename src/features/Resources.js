import React, { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from './shared/components/table/Table.js';
import Paper from '@material-ui/core/Paper';
import NewResourceButton from './admin/NewResourceButton.js';
import { LANGUAGE } from '../app/utils/constants.js';
import { useSelector } from 'react-redux';
import { selectAllResources } from './admin/duck/resources/selectors.js';

const {
    tableHeaderLabels
} = LANGUAGE.admin.admin.resources;

const Resources = React.memo(function Resources() {
    const resources = useSelector(selectAllResources);

    const columns = useMemo(() => [
        { field: '_id', headerName: tableHeaderLabels._id },
    ], []);

    const rows = useMemo(() => resources.map(resource => ({
        _id: resource._id,
    })), [resources]);

    return (
        <Paper>
            <Grid container>
                <NewResourceButton />
                <Table rows={rows} columns={columns} />
            </Grid>
        </Paper>
    );
});

export default Resources;