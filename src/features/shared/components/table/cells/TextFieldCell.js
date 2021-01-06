import React, { useCallback } from 'react';
import TableTextField from 'features/shared/inputs/TableTextField.js';
import EditTableCell from 'features/shared/components/table/cells/EditTableCell.js';

const TextFieldCell = React.memo(function TextFieldCell({ rowIdx, field, value, onCellChange, width, type }) {

    const onChange = useCallback(
        e => onCellChange(rowIdx, field, e.target.value),
        [field, rowIdx, onCellChange]
    );

    return (
        <EditTableCell width={ width }>
            <TableTextField
                type={ type }
                value={ value }
                onChange={ onChange }
            />
        </EditTableCell>
    )
});

export default TextFieldCell;