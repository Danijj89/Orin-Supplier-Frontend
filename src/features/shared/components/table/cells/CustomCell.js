import React from 'react';
import PropTypes from 'prop-types';
import EditTableCell from 'features/shared/components/table/cells/EditTableCell.js';
import TableCell from '@material-ui/core/TableCell';

const CustomCell = React.memo(function CustomCell({ row, width, align, render, isEdit }) {
    return (
        <>
            { isEdit &&
            <EditTableCell width={ width } align={ align }>
                { render(row) }
            </EditTableCell>
            }
            { !isEdit &&
            <TableCell width={ width } align={ align }>
                { render(row) }
            </TableCell>
            }
        </>
    );

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
    align: PropTypes.string,
    isEdit: PropTypes.bool
};

export default CustomCell;

