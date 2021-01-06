import React from 'react';
import PropTypes from 'prop-types';
import EditTableCell from 'features/shared/components/table/cells/EditTableCell.js';

const CustomCell = React.memo(function CustomCell({ row, width, align, render }) {
    return (
        <EditTableCell width={ width } align={ align }>
            { render(row) }
        </EditTableCell>
    )
}, (prev, next) => {
    for (const [k, v] of Object.entries(prev.row)) {
        if (v !== next.row[k]) return false;
    }
    return true;
});

CustomCell.propTypes = {
    row: PropTypes.object.isRequired,
    render: PropTypes.func.isRequired,
    width: PropTypes.number,
    align: PropTypes.string
};

export default CustomCell;

