import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from './EditableTable.js';

const CustomCell = React.memo(function CustomCell({ row, width, align, render }) {
    return (
        <TableCell width={ width } align={ align }>
            { render(row) }
        </TableCell>
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

