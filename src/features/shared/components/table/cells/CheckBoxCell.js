import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import EditTableCell from 'features/shared/components/table/cells/EditTableCell.js';

const CheckBoxCell = React.memo(function CheckBoxCell(
    { checked, onCellChange, rowIdx, field, width }) {

    const onChange = useCallback(
        e => onCellChange(rowIdx, field, e.target.checked),
        [rowIdx, field, onCellChange]
    );

    return (
        <EditTableCell width={ width } align="center">
            <Checkbox
                color="primary"
                checked={ checked }
                onChange={ onChange }
            />
        </EditTableCell>

    )
});

CheckBoxCell.propTypes = {
    checked: PropTypes.bool.isRequired,
    onCellChange: PropTypes.func.isRequired,
    rowIdx: PropTypes.number.isRequired,
    field: PropTypes.string.isRequired,
    width: PropTypes.number
};

export default CheckBoxCell;