import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import FilterSelector from './tools/filter/FilterSelector.js';
import ArchiveSelector from 'features/shared/components/table/tools/archive/ArchiveSelector.js';
import makeStyles from '@material-ui/core/styles/makeStyles.js';

const useStyles = makeStyles(theme => ({
    tool: {
        margin: theme.spacing(1)
    }
}));

const TableToolbar = React.memo(function TableToolbar({ tools, rows, setRows }) {
    const classes = useStyles();
    const renderedTools = useMemo(() => tools.map(tool => {
        const { id, type, options } = tool;
        switch (type) {
            case 'filter':
                return (
                    <FilterSelector
                        key={ id }
                        options={ options }
                        rows={ rows }
                        setRows={ setRows }
                        className={ classes.tool }
                    />
                );
            case 'archive':
                return (
                    <ArchiveSelector
                        key={ id }
                        options={ options }
                    />
                );
            default:
                return null;
        }
    }), [rows, setRows, tools, classes])

    return (
        <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
        >
            { renderedTools }
        </Grid>
    );
});

TableToolbar.propTypes = {
    tools: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    setRows: PropTypes.func.isRequired
};

export default TableToolbar;