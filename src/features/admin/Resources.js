import React, { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from 'features/shared/components/table/Table.js';
import Paper from '@material-ui/core/Paper';
import NewResourceButton from 'features/admin/NewResourceButton.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { useSelector } from 'react-redux';
import { selectAllResources } from 'features/admin/duck/resources/selectors.js';

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

    const options = useMemo(() => ({
        table: {
            dense: false
        }
    }), []);

    return (
        <Paper>
            <Grid container>
                <NewResourceButton/>
                <Table rows={ rows } columns={ columns } options={ options }/>
            </Grid>
        </Paper>
    );
});

export default Resources;