import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import FilterSelector from './tools/filter/FilterSelector.js';
import ArchiveSelector from 'features/shared/components/table/tools/archive/ArchiveSelector.js';

const TableToolbar = React.memo(function TableToolbar({ tools, rows, setRows }) {
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
    }), [rows, setRows, tools])

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